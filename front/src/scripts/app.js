define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',
    'fastclick',
    'promise',
    
    // Routers
    'routers/appRouter',

    // Views
    'views/appLayoutView',

    // Collections
    'collections/posts',

    // Models
    'models/user'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,
    FastClick,
    Promise,

    // Routers
    Router,

    // Views
    AppLayoutView,

    // Collections
    PostsCollection,
    
    // Models
    UserModel
) {
    "use strict";
    Promise = Promise.Promise;

    var App = Backbone.Marionette.Application.extend({

        initialize: function() {
            window.socketPath = 'http://localhost:8080';
            FastClick.attach(document.body);
            this.bootstrap();

            this.addRegions({
                wrapper: "#app-wrapper"
            });
        },

        bootstrap: function(options) {
            var promise = this.initializeState();

            promise.then(function() {
                this.listenTo(state.vent, 'show:mainView', this.showMainView);
                this.flashListener();
                this.router = new Router();
            
                if (Backbone.history) {
                    Backbone.history.start({pushState: true, root: '/'});
                }
            }.bind(this));
        },

        showMainView: function(layout) {
           this.wrapper.show(new AppLayoutView({layout: layout}));
        },

        initializeState: function() {
            return new Promise(function(resolve, reject) {
                state.posts = new PostsCollection();
                state.posts.fetch(); 
                state.user = new UserModel();
                state.user.fetch({
                    success: function() {
                        resolve();
                    }
                });
            });    
        },

        flashListener: function() {
            var flashMessage = document.getElementById('flash-message');
            if (flashMessage) {
                var closeIcon = flashMessage.getElementsByClassName('close-flash-message')[0];
                closeIcon.addEventListener('click', this.closeFlash);
            }
        },

        closeFlash: function() {
            var flashMessage = document.getElementById('flash-message'),
                closeIcon = flashMessage.getElementsByClassName('close-flash-message')[0];
                closeIcon.removeEventListener('click', this.closeFlash);
            flashMessage.parentNode.removeChild(flashMessage);
        }
    });

    return App;
});
