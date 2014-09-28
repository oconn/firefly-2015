define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'state',

    // Templates
    'templates/posts/postItemTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    state,

    // Templates
    template
) {
    "use strict";

    var PostItemView = Backbone.Marionette.ItemView.extend({
        template: template,

        ui: {
            back: '.back' 
        },

        events: {
            'click @ui.back': 'goBack'
        },

        goBack: function() {
            state.vent.trigger('trigger:link', 'posts');    
        },

        modifyKeyWords: function(html) {
            var re = new RegExp('<span class="hljs-keyword">this</span>', 'g');
            return html.replace(re, '<span class="hljs-keyword-this">this</span>');
        },

        templateHelpers: function() {
            var h = {};
            
            h.body = this.modifyKeyWords(this.model.get('body'));

            return h;
        }
    });

    return PostItemView;
});     
