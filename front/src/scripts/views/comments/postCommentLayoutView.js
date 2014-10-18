define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Templates
    'templates/comments/postCommentLayoutTemplate',

    // Views
    'views/comments/postCommentCollectionView',
    'views/comments/postCommentFormView',
    'views/comments/postCommentSignInUpLayoutView'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,

    // Templates
    template,

    // Views
    PostCommentCollectionView,
    PostCommentFormView,
    PostCommentSignInUpLayoutView
) {
    "use strict";

    var PostCommentLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,
 
        regions: {
            postComments: '#post-comment-collection',
            commentForm: '#comment-form' 
        },

        onRender: function() {
            this.postComments.show(new PostCommentCollectionView(this.postId));
            this.listenTo(state.vent, 'comments:fetched', this.displayCommentForm);
            
        },

        initialize: function() {
            this.postId = {postId: this.model.get('_id')};       
        },
        
        /**
         * Will display base comment form or a not
         * signed in view
         *
         * @method displayCommentForm
         */

        displayCommentForm: function() {
            
            if (state.user.get('email')) {
                this.commentForm.show(new PostCommentFormView(this.postId));
            } else {
                this.commentForm.show(new PostCommentSignInUpLayoutView()); 
            }
        }
    });

    return PostCommentLayoutView;
});
