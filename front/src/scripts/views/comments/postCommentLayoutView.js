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
        'views/comments/postCommentFormView'
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
        PostCommentFormView
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

            displayCommentForm: function() {
                this.commentForm.show(new PostCommentFormView(this.postId));
            }
        });

        return PostCommentLayoutView;
});
