define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',
    'fastclick',
    
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
    
    var App = Backbone.Marionette.Application.extend({

        initialize: function() {
            FastClick.attach(document.body);
            this.on("before:start", function(options){
                this.bootstrap(options);
            }.bind(this));

            this.on("start", function(options){
                this.startApp(options);
            }.bind(this));

            this.addRegions({
                wrapper: "#app-wrapper",
                modal: '#modal'
            });
            
            this.start();
        },

        bootstrap: function(options) {
            this.listenTo(state.vent, 'show:mainView', this.showMainView);
            this.flashListener();
            this.router = new Router();
            this.initializeState();

            if (Backbone.history) {
                Backbone.history.start({pushState: true, root: '/'});
            }
        },

        startApp: function() {

        },

        showMainView: function(layout) {
            this.wrapper.show(new AppLayoutView({layout: layout}));
        },

        initializeState: function() {
            state.posts = new PostsCollection();
            state.posts.fetch(); 
            state.user = new UserModel();
            state.user.fetch({
                success: function() {
                    state.vent.trigger('update:navbar');
                }
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
