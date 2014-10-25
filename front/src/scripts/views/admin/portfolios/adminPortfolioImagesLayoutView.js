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
        ui: {
            addImages: '.add-portfolio-images',
            imagesForm: '.portfolio-images-form',
            uploadingFiles: '.uploading-files',
            uploader: '.fileupload'   
        },

        regions: {
            portfolioImages: '.portfolio-images-collection'  
        },

        initialize: function(options) {
            options = options || {};
            this.portfolio = options.portfolio;
        },        

        onRender: function() {
            this.portfolioImages.show(new AdminPortfolioImagesCollectionView({}));

            this.addFileUploadScript();
        },

        addFileUploadScript: function() {
            this.ui.uploadingFiles.html('');    
            this.$el.find(this.ui.uploader).fileupload({
                dataType: 'json',
                formData: {
                    portfolioId: this.portfolio.get('_id')
                },    
                done: function(e, data) {
                
                }.bind(this),
                fail: function(e, data) {
                    var error = data.response().jqXHR.responseJSON.error;
                    this.ui.uploadingFiles.append('<p>' + error + '</p>');
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
