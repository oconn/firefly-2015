define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'state',

        // Templates
        'templates/posts/postsIndexLayoutTemplate',

        // Views
        'views/posts/postsCollectionView'
], function(
        $,
        _,
        Backbone,
        Marionette,
        state,

        // Templates
        template,

        // Views
        PostsCollectionView
) {
        "use strict";

        var PostsIndexLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            regions: {
                postsCollection: '#post-collection'
            },

            onRender: function() {
                this.postsCollection.show(new PostsCollectionView({
                    collection: state.posts
                }));
            }
        });
    
        return PostsIndexLayoutView;
});
