define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'socketio',
 
    // Templates
    'templates/admin/portfolios/adminPortfolioImagesCollectionChildTemplate',
    'templates/admin/portfolios/adminPortfolioImagesCompositeTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    io,

    // Templates
    template,
    compositeTemplate
) {
    "use strict";
    
    var AdminPortfolioImagesCollectionChildView = Backbone.Marionette.LayoutView.extend({
        template: template,

        initialize: function() {
        }
    });

    var AdminPortfolioImagesCollectionView = Backbone.Marionette.CollectionView.extend({
        childView: AdminPortfolioImagesCollectionChildView,

        initialize: function() {
        }
    });

    var AdminPortfolioImagesLayoutView = Backbone.Marionette.LayoutView.extend({
        template: compositeTemplate,
        className: 'admin-portfolio',
        ui: {
            imagesForm: '.portfolio-images-form',
            uploadingFiles: '.uploading-files',
            uploader: '.fileupload'   
        },

        events: {
            'change @ui.uploader': 'addFiles',
            'submit @ui.imagesForm': 'onSubmit'
        },

        approvedFile: function(type) {
            var types = [
                'image/jpeg',
                'image/png'
            ];

            return types.indexOf(type) !== -1;
        },

        sendFile: function(file, index) {
            var socket = io.connect(window.socketPath);
            socket.emit('headers', {
                name: file.name,
                type: file.type,
                size: file.size
            });
            socket.on('uploader-error', function(data) {
                console.log(data);
            });
            socket.on('send-buffer', function(data) {
                socket.emit('process-buffer', file.arraybuffer);
            });
        },

        onSubmit: function(e) {
            e.preventDefault();

            _.each(this.files, function(file, index) {
                if (file.arraybuffer) {
                    this.sendFile(file, index);
                }     
            }.bind(this)); 
        },

        regions: {
            portfolioImages: '.portfolio-images-collection'  
        },

        initialize: function(options) {
            options = options || {};
            this.portfolio = options.portfolio;
        },

        addFiles: function() {
            this.ui.uploadingFiles.html('');
            this.files = this.ui.uploader[0].files;
            _.each(this.files, function(file, index) {
                this.newFile(file, index, function(html) {
                    this.ui.uploadingFiles.append(html);
                }.bind(this));
            }.bind(this));
            this.ui.imagesForm.append('<input type="submit" value="upload"></input>');
            this.ui.uploader.addClass('hidden');
        }, 
        
        saveArrayBuffer: function(file, index) {
            var reader = new FileReader();
            reader.onload = function(e) {
                this.files[index].arraybuffer = e.target.result;   
            }.bind(this);
            reader.readAsArrayBuffer(file);
        },

        getImageData: function(file, cb) {
            var reader = new FileReader();
            reader.onload = function(e) {
                cb(e.target.result);
            }.bind(this);
            reader.readAsDataURL(file);
        },       

        newFile: function(file, index, cb) {
            var approved = this.approvedFile(file.type),
                size = Math.round(file.size / 1048576);
            
            size = size < 1 ? '<1' : size;
            size = approved ? size + 'MB' : ' Invalid Filetype';
            
            if (approved) {
                this.getImageData(file, function(dataURL) {
                    this.saveArrayBuffer(file, index);
                    var html = '<img src="' + dataURL  + '" class="thumb" height="200"></img>' + 
                        '<p class="valid">' + 
                        file.name + ': Size: ' + 
                        size + '</p>';
                    cb(html);
                }.bind(this));
            } else {
                cb('<p class="invalid">' + file.name + ': Size: ' + size + '</p>');
            }
        },

        onRender: function() {
            this.portfolioImages.show(new AdminPortfolioImagesCollectionView({}));
        }
    });

    return AdminPortfolioImagesLayoutView;
});
