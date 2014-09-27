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
            
            ui: {
                brand: "#brand",
                links: "#navbar li"
            },

            events: {
                'click @ui.links': 'triggerLink'
            },

            triggerLink: function(e) {
                state.vent.trigger('trigger:link', e.currentTarget.getAttribute('data-link'));
            }
        });

        return NavigationItemView;
});
