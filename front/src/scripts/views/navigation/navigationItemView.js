define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'state'
], function(
        $,
        _,
        Backbone,
        Marionette,
        state
) {
        "use strict";

        var NavigationItemView = Backbone.Marionette.ItemView.extend({
            tagName: 'nav',

            ui: {
                brand: "#brand",
                links: "ul li a"
            },

            events: {
                'click @ui.links,@ui.brand': 'triggerLink'
            },

            triggerLink: function(e) {
                state.vent.trigger('trigger:link', e.currentTarget.getAttribute('data-link'));
            }
        });

        return NavigationItemView;
});
