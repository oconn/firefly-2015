define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'uploader',
 
    // Templates
    'templates/admin/portfolios/adminPortfolioImagesCollectionChildTemplate',
    'templates/admin/portfolios/adminPortfolioImagesCompositeTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    Uploader,

    // Templates
    template,
    compositeTemplate
) {
    "use strict";
    
    var AdminPortfolioImagesCollectionChildView = Backbone.Marionette.LayoutView.extend({
        template: template
    });

    var AdminPortfolioImagesCollectionView = Backbone.Marionette.CollectionView.extend({
        childView: AdminPortfolioImagesCollectionChildView
    });

    var AdminPortfolioImagesLayoutView = Backbone.Marionette.LayoutView.extend({
        template: compositeTemplate,
        ui: {
            addImages: '.add-portfolio-images',
            imagesForm: '.portfolio-images-form',
            uploadingFiles: '.uploading-files',
            uploader: '.fileupload'   
        },

        regions: {
            portfolioImages: '.portfolio-images-collection'  
        },

        initialize: function() {
        
        },        

        onRender: function() {
            this.portfolioImages.show(new AdminPortfolioImagesCollectionView({
                collection: this.collection
            }));

            this.addFileUploadScript();
        },

        addFileUploadScript: function() {
            this.$el.find(this.ui.uploader).fileupload({
                dataType: 'json',
                formData: {
                    portfolioId: this.options.portfolio   
                },    
                done: function(e, data) {
                    this.ui.uploadingFiles.html('');    
                    _.each(data.result.files, function(file) {
                         this.ui.uploadingFiles.append('<p>' + file.name + '</p>');
                    });
                }.bind(this) 
            });
        },        

        events: {
            'click @ui.addImages': 'showImagesForm'
        },

        showImagesForm: function() {
            this.ui.imagesForm.toggleClass('hidden');
        }

       
    });

    return AdminPortfolioImagesLayoutView;
});
