define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',
    'fastclick',

    'routers/appRouter'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,
    FastClick,

    Router
) {
    "use strict";
    
    var App = Backbone.Marionette.Application.extend({

        initialize: function() {
            FastClick.attach(document.body);
            this.on("before:start", function(options){
                this.bootstrap(options);
            }.bind(this));

            this.on("start", function(options){
                // this.startApp(options);
            }.bind(this));

            this.addRegions({
                wrapper: "#app-wrapper",
                modal: '#modal'
            });

            this.start();
        },

        bootstrap: function(options) {
            // this.listenTo(state.vent, 'show:app', this.showApp);
            // this.listenTo(state.vent, 'show:modal', this.showModal);
            this.router = new Router();
            // this.initializeState();

            if (Backbone.history) {
                Backbone.history.start({pushState: true, root: '/'});
            }
        }
    });

    return App;
});
