define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Templates
    'templates/posts/postsCollectionItemTemplate'
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

    var PostsCollectionItemView = Backbone.Marionette.ItemView.extend({
        template: template,

        ui: {
            deletePost: '.delete-post',
            updatePost: '.update-post'
        },

        events: {
            'click @ui.deletePost': 'deletePost',
            'click @ui.updatePost': 'updatePost'
        },

        deletePost: function() {
             console.log(this.model);
             this.model.destroy();
        },

        updatePost: function() {
        
        },

        templateHelpers: function() {
            var h = {};
            
            h.isAdmin = state.user.admin;

            return h;
        }
    });

    var PostsCollectionView = Backbone.Marionette.CollectionView.extend({
        childView: PostsCollectionItemView
    });

    return PostsCollectionView;
});
