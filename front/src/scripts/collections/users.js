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

        var Users = Backbone.Collection.extend({
            idAttribute: '_id',
            url: '/api/users'
        });

        return Users;
});     
