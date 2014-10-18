 define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',

    // Views
    'views/sessions/signupLayoutView',
    'views/sessions/loginLayoutView',

    // Templates
    'templates/comments/postCommentSignInUpLayoutTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,

    // Views
    SignUpFormView,
    SignInFormView,
    
    // Template
    template    
) {
    "use strict";

    var PostCommentSignInUpLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,

        ui: {
            signin: '.signin',
            signup: '.signup'
        },

        events: {
            'click @ui.signin': 'showSignIn',
            'click @ui.signup': 'showSignUp'
        },

        regions: {
            signInUp: '#post-comment-signinup'
        },

        initialize: function() {
             
        },

        showSignIn: function() {
            this.signInUp.show(new SignInFormView()); 
        },

        showSignUp: function() {
            this.signInUp.show(new SignUpFormView());
        }
    });

    return PostCommentSignInUpLayoutView;
});       
        
        
        
        
 
        
        
 
        
        
        
        
