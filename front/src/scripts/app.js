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
    'collections/posts'
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
    PostsCollection
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
            // this.listenTo(state.vent, 'show:modal', this.showModal);
            this.listenTo(state.vent, 'show:mainView', this.showMainView);
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

            // TODO Create User Model/Collection
            state.user = {
                firstName: 'Matt',
                lastName: 'O\'Connell',
                admin: true
            };
        }
    });

    return App;
});
