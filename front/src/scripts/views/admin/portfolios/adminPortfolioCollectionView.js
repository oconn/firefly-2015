define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'state',

        // Templates
        'templates/admin/portfolios/adminPortfolioCollectionChildTemplate',

        // Collections
        'collections/portfolios',

        // Views
        'views/admin/portfolios/adminPortfolioImagesLayoutView'
], function(
        $,
        _,
        Backbone,
        Marionette,
        state,

        // Templates
        template,

        // Collections
        PortfolioCollection,

        // Views
        AdminPortfolioImagesLayoutView
) {
        "use strict";
        
        var AdminPortfolioCollectionChildView = Backbone.Marionette.LayoutView.extend({
            template: template,

            initialize: function() {
            
            },
                
            regions: {
                portfolioImages: '.portfolio-images'    
            },

            ui: {
                portfolioName: '.portfolio-name'    
            },

            events: {
                'click @ui.portfolioName': 'editPortfolio' 
            },

            editPortfolio: function() {
                if (this.portfolioImages.hasView()) {
                    this.portfolioImages.empty();    
                } else {
                    this.portfolioImages.show(new AdminPortfolioImagesLayoutView({
                        portfolio: this.model 
                    }));   
                }   
            }        

        });

        var AdminPortfolioCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: AdminPortfolioCollectionChildView,

            initialize: function() {
                this.collection = new PortfolioCollection();
                this.collection.fetch();
                this.listenTo(state.vent, 'admin:add:portfolio', this.addPortfolio);
            },     
            
            addPortfolio: function(newPortfolio) {
                this.collection.create(newPortfolio, {wait: true});
            }
        });

        return AdminPortfolioCollectionView;
});
