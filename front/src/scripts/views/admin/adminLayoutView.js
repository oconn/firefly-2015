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
        'views/admin/users/adminUsersLayoutView',
        'views/admin/portfolios/adminPortfolioLayoutView'
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
        AdminUserLayoutView,
        AdminPortfolioLayoutView
) {
        "use strict";

        var AdminLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            ui: {
                createPost: '#create-post',
                manageUsers: '#manage-users',
                managePortfolios: '#manage-portfolios'        
            },

            events: {
                'click @ui.createPost': 'createPost',
                'click @ui.manageUsers': 'manageUsers',
                'click @ui.managePortfolios': 'managePortfolios'        
            },

            createPost: function() {
                state.vent.trigger('trigger:unlinked', new AdminPostLayoutView());
            },

            manageUsers: function() {
                state.vent.trigger('trigger:unlinked', new AdminUserLayoutView());
            },

            managePortfolios: function() {
                state.vent.trigger('trigger:unlinked', new AdminPortfolioLayoutView()); 
            }
        });

        return AdminLayoutView;
});
