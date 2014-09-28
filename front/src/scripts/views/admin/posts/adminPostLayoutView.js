define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',

        // Templates
        'templates/admin/posts/adminPostLayoutTemplate',

        // Views
        'views/admin/posts/postFormView'
], function(
        $,
        _,
        Backbone,
        Marionette,

        // Templates
        template,

        // Views
        PostFormView
) {
        "use strict";

        var AdminPostLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,

            initialize: function(options) {
            
            },

            regions: {
                postForm: '#post-form' 
            },

            onRender: function() {
                this.postForm.show(new PostFormView(this.options));
            },

            templateHelpers: function() {
                var h = {};
                
                h.actionMessage = this.options.model ? 'Update Post' : 'Create Post';    

                return h;    
            }
        });

        return AdminPostLayoutView;
});
