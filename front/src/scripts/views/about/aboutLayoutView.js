define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/about/aboutLayoutTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template
) {
        "use strict";

        var AboutLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template
        });

        return AboutLayoutView;
});
