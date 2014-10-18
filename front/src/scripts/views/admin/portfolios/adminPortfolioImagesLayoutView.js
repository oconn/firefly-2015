define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
 
    // Templates
    'templates/admin/portfolios/adminPortfolioImagesCollectionChildTemplate',
    'Templates/admin/portfolios/adminPortfolioImagesCompositeTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,

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
            imagesForm: '.portfolio-images-form'    
        },

        regions: {
            portfolioImages: '.portfolio-images-collection'  
        },

        onRender: function() {
            this.portfolioImages.show(new AdminPortfolioImagesCollectionView({
                collection: this.collection
            }));
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
