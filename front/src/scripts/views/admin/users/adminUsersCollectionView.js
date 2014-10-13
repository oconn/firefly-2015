define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/admin/users/adminUsersCollectionChildTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template
) {
        "use strict";
        
        var AdminUsersCollectionChildView = Backbone.Marionette.ItemView.extend({
            template: template
        });
        
        var AdminUsersCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: AdminUsersCollectionChildView,
            comparator: 'name',

            initialize: function(options) {
                options = options || {};

                this.collection = options.collection;
            }
        });

        return AdminUsersCollectionView;
});
