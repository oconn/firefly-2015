define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/admin/users/adminUsersLayoutTemplate',

        // Collections
        'collections/users',

        // Views
        'views/admin/users/adminUsersCollectionView'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template,

        // Collections
        Users,

        // Views
        AdminUsersCollectionView
) {
        "use strict";

        var AdminUsersLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            regions: {
                users: '#users-list'
            },

            onRender: function() {
                new Users().fetch({
                    success: function(users) {
                        this.users.show(new AdminUsersCollectionView({
                            collection: users
                        }));
                    }.bind(this),
                    error: function() {
                    
                    }.bind(this)
                });
            }
        });

        return AdminUsersLayoutView;
});
