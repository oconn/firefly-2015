define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'marionette.formview',
        'state',
        'utils',

        // Templates
        'templates/comments/postCommentFormTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,
        FormView,
        state,
        utils,

        // Templates
        template
) {
        "use strict";

        var PostFormView = Backbone.Marionette.FormView.extend({
            template: template,
       
            fields: {
                text: {
                    el: "#post-comment"
                } 
            },

            ui: {
                commentField: '#post-comment'
            },

            onSubmit: function(e) {
                e.preventDefault();
                var comment = this.serializeFormData();
                comment.user = utils.safeUser();
                state.comments.create(comment, {
                    wait: true,
                    success: function(savedComment) {
                        state.vent.trigger('comment:added', savedComment); 
                    }
                });
                this.ui.commentField.val(''); 
            }     
        });

        return PostFormView;
});
