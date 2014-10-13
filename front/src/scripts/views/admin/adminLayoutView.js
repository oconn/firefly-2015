define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'state',

        // Templates
        'templates/admin/adminLayoutTemplate',

        // Views
        'views/admin/posts/adminPostLayoutView',
        'views/admin/users/adminUsersLayoutView'
], function(
        $,
        _,
        Backbone,
        Marionette,
        state,

        // Templates
        template,

        // Views
        AdminPostLayoutView,
        AdminUserLayoutView
) {
        "use strict";

        var AdminLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            ui: {
                createPost: '#create-post',
                manageUsers: '#manage-users'
            },

            events: {
                'click @ui.createPost': 'createPost',
                'click @ui.manageUsers': 'manageUsers'
            },

            createPost: function() {
                state.vent.trigger('trigger:unlinked', new AdminPostLayoutView());
            },

            manageUsers: function() {
                state.vent.trigger('trigger:unlinked', new AdminUserLayoutView());
            }
        });

        return AdminLayoutView;
});
