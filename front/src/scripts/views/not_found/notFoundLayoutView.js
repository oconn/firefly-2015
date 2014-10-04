define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/not_found/notFoundLayoutTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template
) {
        "use strict";

        var NotFoundLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template
        });

        return NotFoundLayoutView;
});
