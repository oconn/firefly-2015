define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'marionette.formview',
        'state',

        // Templates
        'templates/admin/posts/newPostFormTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,
        FormView,
        state,

        // Templates
        template
) {
        "use strict";

        var NewPostFormView = Backbone.Marionette.FormView.extend({
            template: template,

            fields: {
                'title': '#post-title',
                'description': '#post-description',
                'body': '#post-body'
            },

            onSubmit: function(e) {
                e.preventDefault();

                var data = this.serializeFormData();
                state.posts.create(data);
            }
        });

        return NewPostFormView;
});
