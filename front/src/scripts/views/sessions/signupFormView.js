define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'marionette.formview',

    // Templates
    'templates/sessions/signupFormTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    FormView,

    // Templates
    template
) {
    "use strict";

    var SignupFormView = Backbone.Marionette.FormView.extend({
        template: template,

        fields: {
            email: {
                el: '#signup-email'
            },
            password: {
                el: '#signup-password'
            }
        },

        onSubmit: function(e) {
            e.preventDefault();

            var data = this.serializeFormData();
            $.post('/api/sessions/signup', data, function(user) {
                
            });
        }
    });

    return SignupFormView;
});
