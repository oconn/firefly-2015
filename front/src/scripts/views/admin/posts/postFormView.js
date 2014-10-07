define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'marionette.formview',
    'state',
    
    // Mixins
    'alertjs',

    // Templates
    'templates/admin/posts/postFormTemplate'
], function(
    $,
    _,
    Backbone,
    Marionette,
    FormView,
    state,

    // Mixins
    alertjs,

    // Templates
    template
) {
    "use strict";

    var PostFormView = Backbone.Marionette.FormView.extend({
        template: template,
        
        ui: {
            description: '#post-description',
            body: '#post-body'
        },

        events: {
            'keydown @ui.description,@ui.body': 'listenForTab'
        },

        fields: {
            'title': '#post-title',
            'description': '#post-description',
            'body': '#post-body'
        },

        initialize: function() {
            if (this.model) {
                this.resetToMarkdown();
            }
        },  

        onSubmit: function(e) {
            e.preventDefault();
           
            var data = this.serializeFormData();

            var alertjsOptions = this.model.isNew() ?
                {
                    title: 'Publish ' + data.title,
                    yes: 'Publish',
                    no: 'Cancel'
                } :
                {
                    title: 'Update ' + data.title,
                    yes: 'Update',
                    no: 'Cancel'
                };

            this.createAlert(alertjsOptions).then(function() {   
                if (!this.model.isNew()) {
                    this.model.save(data, {
                        success: function() {
                            state.vent.trigger('trigger:link', 'posts');
                        }
                    }); 
                } else {
                    state.posts.create(data, {
                        wait: true,
                        success: function() {
                            state.vent.trigger('trigger:link', 'posts');
                        }
                    });
                }
            }.bind(this));
        },

        listenForTab: function(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
                var currentTarget = e.currentTarget,
                    val = currentTarget.value,
                    start = currentTarget.selectionStart,
                    end = currentTarget.selectionEnd;

                currentTarget.value = 
                    val.substring(0, start) + 
                    '\t' + 
                    val.substring(end);
                
                currentTarget.selectionStart = 
                    currentTarget.selectionEnd = 
                    start + 1;

                return false;
            }
        },

        resetToMarkdown: function() {
            var model = this.model;
            model.set('description', model.get('description_raw'));
            model.set('body', model.get('body_raw'));  
        },

        templateHelpers: function() {
            var h = {};
            
            h.submitValue = this.model.isNew() ? 'Create Post' : 'Update Post';
            
            return h;
        }
    });

    _.extend(PostFormView.prototype, alertjs);

    return PostFormView;
});
