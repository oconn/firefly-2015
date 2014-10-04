define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Templates
    'templates/posts/postLayoutTemplate',

    // Views
    'views/posts/postItemView',
    'views/comments/postCommentLayoutView'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,

    // Templates
    template,

    // Views
    PostItemView,
    PostCommentLayoutView
) {
    "use strict";


    var PostLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,
        
        regions: {
            selectedPost: '#selected-post',
            postComments: '#post-comments' 
        },

        ui: {
            back: '.back' 
        },

        events: {
            'click @ui.back': 'goBack'
        },

        goBack: function() {
            state.vent.trigger('trigger:link', 'posts');    
        },

        onRender: function() {
            this.selectedPost.show(new PostItemView(this.options));
            this.postComments.show(new PostCommentLayoutView(this.options));
        }
    });

    return PostLayoutView;
});
