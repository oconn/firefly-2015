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
            updatePost: '.update-post',
            postTitle: '.post-title'
        },

        events: {
            'click @ui.deletePost': 'deletePost',
            'click @ui.updatePost': 'updatePost',
            'click @ui.postTitle': 'goToPost'
        },

        initialize: function() {
        
        },

        deletePost: function() {
             this.model.destroy();
        },

        updatePost: function() {
             state.vent.trigger('trigger:link', 'posts:create', {model: this.model}); 
        },

        modifyKeyWords: function(html) {
            var re = new RegExp('<span class="hljs-keyword">this</span>', 'g');
            return html.replace(re, '<span class="hljs-keyword-this">this</span>');
        },

        goToPost: function() {
            state.vent.trigger('trigger:link', 'posts:view', {model: this.model});
        },

        templateHelpers: function() {
            var h = {};
            
            h.isAdmin = state.user.admin;
            h.description = this.modifyKeyWords(this.model.get('description'));

            return h;
        }
    });

    var PostsCollectionView = Backbone.Marionette.CollectionView.extend({
        childView: PostsCollectionItemView
    });

    return PostsCollectionView;
});
