define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Mixins
    'alertjs',

    // Templates
    'templates/posts/postsCollectionItemTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,

    // Mixins
    alertjs,

    // Templates
    template
) {
    "use strict";

    var PostsCollectionItemView = Backbone.Marionette.ItemView.extend({
        template: template,
        className: 'post-wrapper',

        ui: {
            deletePost: '.delete-post',
            updatePost: '.update-post',
            postTitle: '.post-title',
            readMore: '.read-more'
        },

        events: {
            'click @ui.deletePost': 'deletePost',
            'click @ui.updatePost': 'updatePost',
            'click @ui.postTitle,@ui.readMore': 'goToPost'
        },

        initialize: function() {
        
        },

        deletePost: function() {
             this.createAlert({
                title: 'Are you sure?',
                message: 'You are about to remove "' + this.model.get('title') + 
                    '". This cannot be undone.',
                yes: 'Remove Post',
                no: 'Cancel'
             }).then(function() {
                this.model.destroy();
             }.bind(this));
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
            
            h.date = new Date(this.model.get('created_at')).toLocaleDateString(); 
            h.isAdmin = state.user.get('admin');
            h.description = this.modifyKeyWords(this.model.get('description'));
 
            return h;
        }
    });

    _.extend(PostsCollectionItemView.prototype, alertjs);

    var PostsCollectionView = Backbone.Marionette.CollectionView.extend({
        childView: PostsCollectionItemView
    });

    return PostsCollectionView;
});
