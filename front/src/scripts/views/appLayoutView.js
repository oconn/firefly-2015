define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Templates
    'templates/appLayoutTemplate',
    'templates/navigation/defaultNavbarTemplate',
    'templates/navigation/adminNavbarTemplate',

    // Views
    'views/navigation/navigationItemView',
    'views/about/aboutLayoutView',
    'views/posts/postsIndexLayoutView',
    'views/admin/adminLayoutView',
    'views/admin/posts/newPostLayoutView'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,
    
    // Templates
    template,
    defaultNavbarTemplate,
    adminNavbarTemplate,

    // Views
    NavigationView,
    AboutLayoutView,
    PostsIndexLayoutView,
    AdminLayoutView,
    NewPostLayoutView
) {
    "use strict";

    var AppLayoutView = Backbone.Marionette.LayoutView.extend({
        template: template,

        regions: {
            navbar: '#navbar',
            main: '#main'
        },

        initialize: function() {
            this.listenTo(state.vent, 'trigger:link', this.triggerLink);
        },

        onRender: function() {
            this.navbar.show(new NavigationView({
                // TODO Programmatically select correct template
                template: adminNavbarTemplate
            }));
        },

        triggerLink: function(link) {
            var layout;
            switch (link) {
            case 'home':
                break;
            case 'about':
                layout = new AboutLayoutView();
                break;
            case 'posts':
                layout = new PostsIndexLayoutView();    
                break;
            case 'admin':
                layout = new AdminLayoutView();
                break;
            case 'posts:create':
                layout = new NewPostLayoutView();
                break;
            default:
                break;
            }

            this.main.show(layout);
        }
    });

    return AppLayoutView;
});
