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

        var Post = Backbone.Model.extend({
            idAttribute: '_id'
        });

        return Post;
});
