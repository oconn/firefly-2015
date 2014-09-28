define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/home/homeLayoutTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template
) {
        "use strict";

        var HomeLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template  
        });

        return HomeLayoutView;
});
