require.config({
    paths:  {
        'jquery': 'vendor/jquery',
        'underscore': 'vendor/underscore',
        'lodash': 'vendor/lodash',
        'backbone': 'vendor/backbone',
        'marionette': 'vendor/backbone.marionette',
        'backbone.wreqr': 'vendor/backbone.wreqr',
        'backbone.babysitter': 'vendor/backbone.babysitter',
        'handlebars': 'vendor/handlebars',
        'marionette.formview': 'vendor/marionette.formview',
        'chosen': 'vendor/chosen.jquery',
        'fastclick': 'vendor/fastclick',
        'alertjs': 'mixins/alert',
        'promise': 'vendor/promise',
        'uploader': 'vendor/jquery-image-uploader'        
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'lodash': {
            exports: '_'
        },
        'backbone': {
          deps : ['jquery', 'underscore'],
          exports : 'Backbone'
        },
        'marionette': {
          deps : ['jquery', 'underscore', 'backbone'],
          exports : 'Marionette'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'chosen': {
            deps: ['jquery']
        },
        'alertjs': {
            deps: ['promise']
        },
        'uploader': {
            deps: ['jquery']
        }        
    },
    baseUrl: '/scripts/',
    name: "main",
    out: "dist/main.js",
    removeCombined: true
});

require(['app'], function(App) { 
    'use strict';

    var app = new App();

    app.initialize();

    window.app = app;
});
