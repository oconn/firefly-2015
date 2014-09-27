define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/admin/posts/newPostLayoutTemplate',

        // Views
        'views/admin/posts/newPostFormView'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template,

        // Views
        NewPostFormView
) {
        "use strict";

        var NewPostLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            regions: {
                newPostForm: '#new-post-form' 
            },

            onRender: function() {
                this.newPostForm.show(new NewPostFormView());
            }
        });

        return NewPostLayoutView;
});
