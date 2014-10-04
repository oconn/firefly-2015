define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',

    // Templates
    'templates/sessions/signupLayoutTemplate',

    // Views
    'views/sessions/signupFormView'
], function(    
    $,
    _,
    Backbone,
    Marionette,

    // Templates
    template,

    // Views
    SignupFormView
) {
    "use strict";

    var SignupLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,

        regions: {
            form: '#signup-form'
        },

        initialize: function() {
        
        },

        onRender: function() {
            this.form.show(new SignupFormView());
        }
    });

    return SignupLayoutView;
});     
