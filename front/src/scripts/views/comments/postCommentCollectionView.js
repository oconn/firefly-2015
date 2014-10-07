define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'marionette.formview',
        'state',
        'utils',

        // Templates
        'templates/comments/postCommentCollectionItemTemplate',
        'templates/comments/postCommentSubCommentLayoutTemplate',

        // Collections
        'collections/comments'
], function(
        $,
        _,
        Backbone,
        Marionette,
        FormView,
        state,
        utils,

        // Templates
        template,
        subCommentTemplate,

        // Collections
        CommentCollection
) {
        "use strict";
        
        var PostCommentCollectionLayoutView = Backbone.Marionette.LayoutView.extend({
            template: template,
            className: 'sub-comment',

            regions: {
                subCommentForm: '.sub-comment-form',
                subComments: '.sub-comments'
            },

            onRender: function() {
                this.setDepthClass();
                if (this.depth < 4) {
                    this.renderSubComments();
                    this.renderSubCommentForm();
                }
            },

            renderSubComments: function() {
                this.subComments.show(new SubCommentCollectionView({parentId: this.model.get('_id')}));
            },

            renderSubCommentForm: function() {
                this.subCommentForm.show(new SubCommentFormView({
                    parentId: this.model.get('_id'),
                    depth: this.depth 
                }));

                this.listenTo(
                    state.vent, 
                    'subcomment:added:' + this.subCommentForm.currentView.cid, 
                    this.appendSubComment
                );
            },

            appendSubComment: function(subComment) {
                this.subComments.currentView.collection.add(subComment);
            },

            setDepthClass: function() {
                this.depth = this.model.get('depth');
                this.$el.addClass('depth-' + this.depth);
                if (this.depth === 0) {
                    this.$el.removeClass('sub-comment').addClass('base-comment');
                }
            },

            templateHelpers: function() {
                var h = {};
                h.fullName = utils.fullName(this.model.get('user'));

                return h;
            }
        });

        var SubCommentCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: PostCommentCollectionLayoutView,

            initialize: function() {
                this.collection = new Backbone.Collection(state.comments.where({
                    parent_id: this.options.parentId
                }));
            } 
        });

        var SubCommentFormView = Backbone.Marionette.FormView.extend({
            template: subCommentTemplate,

            fields: {
                text: {
                    el: '.cub-post-comment'
                } 
            },

            ui: {
                addCommentBtn: '.add-comment-btn',
                form: '.post-subcomment-form'
            },

            events: {
                'click @ui.addCommentBtn': 'showForm'
            },

            onSubmit: function(e) {
                e.preventDefault();

                var subComment = this.serializeFormData();
                subComment.parent_id = this.options.parentId;
                subComment.depth = this.options.depth + 1; 
                subComment.user = utils.safeUser();
                state.comments.create(subComment, {
                    wait: true,
                    success: function(savedComment) {
                        state.vent.trigger('subcomment:added:' + this.cid, savedComment);
                    }.bind(this)
                });
                this.showForm();
                this.clearForm();
            },

            showForm: function() {
                this.ui.form.toggleClass('hidden');
            },

            clearForm: function() {
            
            }
        });

        var PostCommentCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: PostCommentCollectionLayoutView,

            initialize: function() {
                this.fetchComments();
                this.listenTo(state.vent, 'comment:added', this.appendComment);
            },

            fetchComments: function() {
                state.comments = new CommentCollection({postId: this.options.postId});
                state.comments.fetch({
                    success: function() {
                       this.collection = new Backbone.Collection(state.comments.where({depth: 0}));
                       this.render();
                       state.vent.trigger('comments:fetched');
                    }.bind(this)
                });
            },

            appendComment: function(comment) {
                this.collection.add(comment);
                this.render();
            }
        });

        return PostCommentCollectionView;
});
