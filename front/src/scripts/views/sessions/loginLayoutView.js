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
                el: '#login-email'
            },
            password: {
                el: '#login-password'
            }
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
