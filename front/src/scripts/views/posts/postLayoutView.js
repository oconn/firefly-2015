define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',

    // Templates
    'templates/posts/postLayoutTemplate',

    // Views
    'views/posts/postItemView'
], function(
    $,
    _,
    Backbone,
    Marionette,

    // Templates
    template,

    // Views
    PostItemView
) {
    "use strict";


    var PostLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,
        
        regions: {
            selectedPost: '#selected-post'
        },

        onRender: function() {
            this.selectedPost.show(new PostItemView(this.options));
        }
    });

    return PostLayoutView;
});
