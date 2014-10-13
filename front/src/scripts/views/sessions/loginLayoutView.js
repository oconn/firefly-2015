define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'marionette.formview',

    // Templates
    'templates/sessions/loginLayoutTemplate',
    'templates/sessions/loginFormTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    FormView,

    // Templates
    template,
    loginFormTemplate
) {
    "use strict";
    
    var LoginFormView = Backbone.Marionette.FormView.extend({
        template: loginFormTemplate,

        fields: {
            email: {
                el: '#login-email',
                required: 'Please enter your email'
            },
            password: {
                el: '#login-password',
                required: 'Please enter your password'
            }
        },

        ui: {
            email: '#login-email',
            password: '#login-password'
        },
        
        events: {
            'focus @ui.email,@ui.password': 'checkForErrors'
        },
        
        checkForErrors: function(e) {
            if (e.currentTarget.classList.contains('error')) {
                e.currentTarget.classList.remove('error');
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

    var LoginLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,

        regions: {
            loginForm: '#login-form'
        },

        onRender: function() {
            this.loginForm.show(new LoginFormView());
        }
    });

    return LoginLayoutView;
});
