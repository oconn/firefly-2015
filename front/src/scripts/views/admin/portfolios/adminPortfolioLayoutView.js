define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/admin/portfolios/adminPortfolioLayoutTemplate',

        // Views
        'views/admin/portfolios/adminPortfolioCollectionView',
        'views/admin/portfolios/adminNewPortfolioFormView'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template,

        // Views
        AdminPortfolioCollectionView,
        AdminNewPortfolioForm
) {
        "use strict";

        var AdminPortfolioLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,
            
            ui: {
                addPortfolioBtn: '#add-new-portfolio'
            },

            regions: {
                portfolios: '#portfolio-collection',
                newPortfolio: '#new-portfolio'    
            },

            events: {
                'click @ui.addPortfolioBtn': 'showNewPortfolioForm'
            },

            onRender: function() {
                this.portfolios.show(new AdminPortfolioCollectionView());
            },
            
            showNewPortfolioForm: function() {
                this.newPortfolio.show(new AdminNewPortfolioForm());
            }
        });

        return AdminPortfolioLayoutView;
}); 
