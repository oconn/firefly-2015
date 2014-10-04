define([
        'jquery',
        'underscore',
        'backbone'
], function(
        $,
        _,
        Backbone
) {
        "use strict";

        var CommentModel = Backbone.Model.extend({
            idAttribute: '_id'
        });

        return CommentModel;
});
