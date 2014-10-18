define([
        'jquery',
        'underscore',
        'backbone',

        // Models
        'models/portfolio'
], function(
        $,
        _,
        Backbone,

        // Models
        Portfolio
) {
        "use strict";

        var PortfolioCollection = Backbone.Collection.extend({
            url: '/api/portfolios',
            model: Portfolio    
        });

        return PortfolioCollection;
});
