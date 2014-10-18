define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'marionette.formview',
        'state',

        // Templates
        'templates/admin/portfolios/adminNewPortfolioFormTemplate'
], function(
        $,
        _,
        Backbone,
        Marionette,
        FormView,
        state,

        // Templates
        template
) {
        "use strict";

        var AdminNewPortfolioFormView = Backbone.Marionette.FormView.extend({
            template: template,

            fields: {
                name: {
                    el: '#portfolio-name',
                    required: 'You need to title your new portfolio'    
                }
            },

            rules: {
                name: function(val) {

                } 
            },

            ui: {
                name: '#portfolio-name' 
            },

            events: {
                'focus @ui.name': 'checkForErrors' 
            },

            checkForErrors: function(e) {
                if (e.currentTarget.classList.contains('error')) {
                    e.currentTarget.classList.remove('error');
                }
            },        

            onSubmit: function(e) {
                e.preventDefault();
                var data = this.serializeFormData();
                state.vent.trigger('admin:add:portfolio', data);
            },

            onSubmitFail: function(errors) {
                _.each(errors, function(err) {
                    // Remove current content and add placehoder
                    this.ui[err.field].val('').attr('placeholder', err.error[0]);
                                    
                    // Add error class
                    this.ui[err.field].addClass('error');
                }.bind(this));    
            }
        });

        return AdminNewPortfolioFormView;
});
