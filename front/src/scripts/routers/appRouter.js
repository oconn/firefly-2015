define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Views
    'views/home/homeLayoutView',
    'views/posts/postsIndexLayoutView',
    'views/about/aboutLayoutView',
    'views/sessions/loginLayoutView',
    'views/sessions/signupLayoutView',
    'views/admin/adminLayoutView',
    'views/not_found/notFoundLayoutView'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,

    // Views
    HomeLayoutView,
    PostLayoutView,
    AboutLayoutView,
    LoginLayoutView,
    SignupLayoutView,
    AdminLayoutView,
    NotFoundLayoutView
) {
    "use strict";
    
    var Router = Backbone.Router.extend({
        
        routes: {
            '': 'home',
            'posts': 'posts',
            'about': 'about',
            'login': 'login',
            'signup': 'signup',
            'admin': 'admin',
            '*path': 'notFound'
        },
        
        home: function() {
            state.vent.trigger('show:mainView', new HomeLayoutView());
        },

        posts: function() {
            state.vent.trigger('show:mainView', new PostLayoutView()); 
        },

        about: function() {
            state.vent.trigger('show:mainView', new AboutLayoutView()); 
        },

        login: function() {
            state.vent.trigger('show:mainView', new LoginLayoutView());
        },

        signup: function() {
            state.vent.trigger('show:mainView', new SignupLayoutView());
        },

        admin: function() {
            state.vent.trigger('show:mainView', new AdminLayoutView());
        },

        notFound: function() {
            state.vent.trigger('show:mainView', new NotFoundLayoutView());
        }
    });

    return Router;
});
