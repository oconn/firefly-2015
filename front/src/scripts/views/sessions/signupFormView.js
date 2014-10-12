define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'marionette.formview',
    'utils',

    // Templates
    'templates/sessions/signupFormTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    FormView,
    utils,

    // Templates
    template
) {
    "use strict";

    var SignupFormView = Backbone.Marionette.FormView.extend({
        template: template,

        fields: {
            name: {
                el: '#signup-name',
                required: 'Please enter your name'
            },
            email: {
                el: '#signup-email',
                required: 'Please enter your email',
                validations: {
                    email: 'Enter a valid email address'
                }
            },
            password: {
                el: '#signup-password',
                required: 'Please enter a password'
            },
            signupConfirm: {
                el: '#signup-confirm',
                required: 'Please confirm your password',
                validations: {
                    passwordMatch: 'Passwords do not match'
                }
            }
        },

        ui: {
            name: "#signup-name",
            email: '#signup-email',
            password: '#signup-password',
            signupConfirm: '#signup-confirm'
        },

        events: {
            'focus @ui.name,@ui.email,@ui.password,@ui.signupConfirm' : 'checkForErrors'
        },

        checkForErrors: function(e) {
            if (e.currentTarget.classList.contains('error')) {
                e.currentTarget.classList.remove('error');
            }
        },

        rules: {
            email: function(val) {
                return utils.emailRegx(val);
            },
            passwordMatch: function(val) {
                return this.form.find('#signup-password').val() === val;
            }
        },

        onSubmitFail: function(errors) {
            _.each(errors, function(err) {

                // Remove current content and add placehoder
                this.ui[err.field].val('').attr('placeholder', err.error[0]);
                                
                // Add error class
                this.ui[err.field].addClass('error');

            }.bind(this));    
        }
    });

    return SignupFormView;
});
