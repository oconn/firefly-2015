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

        var User = Backbone.Model.extend({
            idAttribute: '_id',
            url: '/api/current_user'
        });

        return User;
});
