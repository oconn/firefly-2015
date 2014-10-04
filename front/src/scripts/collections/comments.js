define([
        'jquery',
        'underscore',
        'backbone',

        // Models
        'models/comment'
], function(
        $,
        _,
        Backbone,

        // Models
        CommentModel
) {
        "use strict";

        var CommentCollection = Backbone.Collection.extend({
            model: CommentModel,
            comparator: 'created_at',

            initialize: function(options) {
                this.url = '/api/comments/' + options.postId;
            }
        });

        return CommentCollection;
}); 
