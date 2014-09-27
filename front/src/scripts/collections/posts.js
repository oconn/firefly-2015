define([
        'jquery',
        'underscore',
        'backbone',

        // Models
        'models/post'
], function(
        $,
        _,
        Backbone,

        // Models
        post
) {
        "use strict";

        var Posts = Backbone.Collection.extend({
            model: post,
            url: '/api/posts'
        });

        return Posts;
});
