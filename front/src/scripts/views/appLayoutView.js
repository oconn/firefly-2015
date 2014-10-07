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
    'views/home/homeLayoutView',
    'views/about/aboutLayoutView',
    'views/posts/postsIndexLayoutView',
    'views/posts/postLayoutView',
    'views/admin/adminLayoutView',
    'views/admin/posts/adminPostLayoutView'
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
    HomeLayout,
    AboutLayoutView,
    PostsIndexLayoutView,
    PostLayoutView,
    AdminLayoutView,
    AdminPostLayoutView
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
            this.main.show(this.options.layout || new HomeLayout());
        },

        triggerLink: function(link, options) {
            var layout,
                triggerNav = true;

            switch (link) {
            case 'home':
                layout = new HomeLayout();
                break;
            case 'about':
                layout = new AboutLayoutView();
                break;
            case 'posts':
                layout = new PostsIndexLayoutView();    
                break;
            case 'posts:view':
                layout = new PostLayoutView(options);
                triggerNav = false;
                Backbone.history.navigate('posts/' + options.model.get('slug'), {trigger: false});
                break;
            case 'admin':
                layout = new AdminLayoutView();
                break;
            case 'posts:create':
                layout = new AdminPostLayoutView(options);
                break;
            default:
                break;
            }
            
            if (triggerNav) {
                Backbone.history.navigate(link, {trigger: false});
            }

            this.main.show(layout);
        }
    });

    return AppLayoutView;
});
