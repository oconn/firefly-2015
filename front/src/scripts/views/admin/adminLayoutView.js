define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'state',

        // Templates
        'templates/admin/adminLayoutTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,
        state,

        // Templates
        template
) {
        "use strict";

        var AdminLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            ui: {
                createPost: '#create-post'
            },

            events: {
                'click @ui.createPost': 'createPost'
            },

            createPost: function() {
                state.vent.trigger('trigger:link', 'posts:create');
            }
        });

        return AdminLayoutView;
});
