(function ($, Views, Models, Collections) {

    //Freelancer Current tab
    var FreelancerCurrentProjectTab = $('#current-project-tab');
    var $freelancer_current = $('.freelancer-current-project-tab');
    Models.FreelancerCurrentProject = Backbone.Model.extend();
    Collections.FreelancerCurrentProjects = Backbone.Collection.extend({
        model: Models.FreelancerCurrentProject,
        action: 'ae-fetch-bid',
        initialize: function () {
            this.paged = 1;
        }
    });

    FreelancerCurrentProjectItem = Views.PostItem.extend({
        tagName: 'div',
        className: 'fre-table-row',
        template: _.template($('#freelancer_current_project_template_js').html()),
        events: {
            'click .bid-action': 'bidActionModal'
        },
        bidActionModal: function (event) {
            var view = this;
            event.preventDefault();
            var $target = event.target;
            if ($target.getAttribute('data-action') == 'remove') {
                if (typeof view.modal_remove_bid == 'undefined') {
                    view.modal_remove_bid = new Views.Modal_Remove_Bid();
                }
                view.modal_remove_bid.$('#bid-id').val($target.getAttribute('data-bid-id'));
                view.modal_remove_bid.openModal();
            } else if ($target.getAttribute('data-action') == 'cancel') {
                if (typeof view.modal_cancel_bid == 'undefined') {
                    view.modal_cancel_bid = new Views.Modal_Cancel_Bid();
                }
                view.modal_cancel_bid.$('#bid-id').val($target.getAttribute('data-bid-id'));
                view.modal_cancel_bid.openModal();
            }
        }
    });

    ListFreelancerCurrentProject = Views.ListPost.extend({
        tagName: 'div',
        itemView: FreelancerCurrentProjectItem,
        itemClass: 'fre-table-row'
    });

    var FreelancerCurrentProjectCollection = new Collections.FreelancerCurrentProjects();
    if ($('#current_project_post_data').length > 0) {
        var data = JSON.parse($('#current_project_post_data').html());
        FreelancerCurrentProjectCollection = new Collections.FreelancerCurrentProjects(data);
    }

    new ListFreelancerCurrentProject({
        itemView: FreelancerCurrentProjectItem,
        collection: FreelancerCurrentProjectCollection,
        el: FreelancerCurrentProjectTab.find('.fre-current-table-rows')
    });
    new Views.BlockControl({
        el: $freelancer_current,
        collection: FreelancerCurrentProjectCollection,
        onBeforeFetch: function () {
            var view = this;
            view.blockUi.unblock();
            view.blockUi.block(view.$el);
            if ($freelancer_current.find('.project-no-results').length > 0) {
                $freelancer_current.find('.project-no-results').remove();
            }
        },
        onAfterFetch: function (result, res) {
            if (!res.success || result.length == 0) {
                $freelancer_current.find('.fre-table').after(ae_globals.text_message.no_project);
            }
        },
        onAfterInit: function () {
            var view = this;
            this.$('.clear-filter').on('click', function (event) {
                view.clearFilter(event);
            });
        },
        clearFilter: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget);
            $(view.$el.selector).find('form')[0].reset();
            $(view.$el.selector).find('form select').trigger('chosen:updated');
            view.query['s'] = '';
            view.query['bid_current_status'] = '';
            view.fetch($target);
        }
    });

    //Freelancer Previous tab
    var FreelancerPreviousProjectTab = $('#previous-project-tab');
    var $freelancer_previous = $('.freelancer-previous-project-tab');
    Models.FreelancerPreviousProject = Backbone.Model.extend();
    Collections.FreelancerPreviousProjects = Backbone.Collection.extend({
        model: Models.FreelancerPreviousProject,
        action: 'ae-fetch-bid',
        initialize: function () {
            this.paged = 1;
        }
    });

    FreelancerPreviousProjectItem = Views.PostItem.extend({
        tagName: 'div',
        className: 'fre-table-row',
        template: _.template($('#freelancer_previous_project_template_js').html()),
        onItemRendered: function () {
            var view = this;
            view.$('.rate-it').raty({
                readOnly: true,
                half: true,
                score: function () {
                    return view.model.get('rating_score');
                },
                hints: raty.hint
            });
        }
    });

    ListFreelancerPreviousProject = Views.ListPost.extend({
        tagName: 'div',
        itemView: FreelancerPreviousProjectItem,
        itemClass: 'fre-table-row'
    });

    var FreelancerPreviousProjectCollection = new Collections.FreelancerPreviousProjects();
    if ($('#previous_project_post_data').length > 0) {
        var data = JSON.parse($('#previous_project_post_data').html());
        FreelancerPreviousProjectCollection = new Collections.FreelancerPreviousProjects(data);
    }

    new ListFreelancerPreviousProject({
        itemView: FreelancerPreviousProjectItem,
        collection: FreelancerPreviousProjectCollection,
        el: FreelancerPreviousProjectTab.find('.fre-previous-table-rows')
    });
    new Views.BlockControl({
        el: $freelancer_previous,
        collection: FreelancerPreviousProjectCollection,
        onBeforeFetch: function () {
            var view = this;
            view.blockUi.unblock();
            view.blockUi.block(view.$el);
            if ($freelancer_previous.find('.project-no-results').length > 0) {
                $freelancer_previous.find('.project-no-results').remove();
            }
        },
        onAfterFetch: function (result, res) {
            if (!res.success || result.length == 0) {
                $freelancer_previous.find('.fre-table').after(ae_globals.text_message.no_project);
            }
        },
        onAfterInit: function () {
            var view = this;
            this.$('.clear-filter').on('click', function (event) {
                view.clearFilter(event);
            });
        },
        clearFilter: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget);
            $(view.$el.selector).find('form')[0].reset();
            $(view.$el.selector).find('form select').trigger('chosen:updated');
            view.query['s'] = '';
            view.query['bid_previous_status'] = '';
            view.fetch($target);
        }
    });

    //Yonghu Current tab
    var YonghuCurrentProjectTab = $('#current-project-tab');
    var $yonghu_current = $('.yonghu-current-project-tab');
    Models.YonghuCurrentProject = Backbone.Model.extend();
    Collections.YonghuCurrentProjects = Backbone.Collection.extend({
        model: Models.YonghuCurrentProject,
        action: 'ae-fetch-projects',
        initialize: function () {
            this.paged = 1;
        }
    });

    YonghuCurrentProjectItem = Views.PostItem.extend({
        tagName: 'div',
        className: 'fre-table-row',
        template: _.template($('#yonghu_current_project_template_js').html()),
        events: {
            'click .project-action': 'projectActionModal',
        },
        projectActionModal: function (event) {
            event.preventDefault();
            var $target = event.target;
            var view = this;
            if ($target.getAttribute('data-action') == 'delete') {
                if (typeof view.modal_delete_project == 'undefined') {
                    view.modal_delete_project = new Views.Modal_Delete_Project();
                }
                view.modal_delete_project.$('#project-id').val($target.getAttribute('data-project-id'));
                view.modal_delete_project.openModal();
            } else if ($target.getAttribute('data-action') == 'archive') {
                if (typeof view.modal_project == 'undefined') {
                    view.modal_project = new Views.Modal_Archive_Project();
                }
                view.modal_project.$('#project-id').val($target.getAttribute('data-project-id'));
                view.modal_project.openModal();
            }
        }
    });

    ListYonghuCurrentProject = Views.ListPost.extend({
        tagName: 'div',
        itemView: YonghuCurrentProjectItem,
        itemClass: 'fre-table-row'
    });

    var YonghuCurrentProjectCollection = new Collections.YonghuCurrentProjects();
    if ($('#current_project_post_data').length > 0) {
        var data = JSON.parse($('#current_project_post_data').html());
        YonghuCurrentProjectCollection = new Collections.YonghuCurrentProjects(data);
    }

    new ListYonghuCurrentProject({
        itemView: YonghuCurrentProjectItem,
        collection: YonghuCurrentProjectCollection,
        el: YonghuCurrentProjectTab.find('.fre-current-table-rows')
    });
    new Views.BlockControl({
        el: $yonghu_current,
        collection: YonghuCurrentProjectCollection,
        onBeforeFetch: function () {
            var view = this;
            view.blockUi.unblock();
            view.blockUi.block(view.$el);
            if ($yonghu_current.find('.project-no-results').length > 0) {
                $yonghu_current.find('.project-no-results').remove();
            }
        },
        onAfterFetch: function (result, res) {
            if (!res.success || result.length == 0) {
                $yonghu_current.find('.fre-table').after(ae_globals.text_message.no_project);
            }
        },
        onAfterInit: function () {
            var view = this;
            this.$('.clear-filter').on('click', function (event) {
                view.clearFilter(event);
            });
        },
        clearFilter: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget);
            $(view.$el.selector).find('form')[0].reset();
            $(view.$el.selector).find('form select').trigger('chosen:updated');
            view.query['project_current_status'] = '';
            view.query['s'] = '';
            view.fetch($target);
        }
    });

    //Yonghu Previous tab
    var YonghuPreviousProjectTab = $('#previous-project-tab');
    var $yonghu_previous = $('.yonghu-previous-project-tab');
    Models.YonghuPreviousProject = Backbone.Model.extend();
    Collections.YonghuPreviousProjects = Backbone.Collection.extend({
        model: Models.YonghuPreviousProject,
        action: 'ae-fetch-projects',
        initialize: function () {
            this.paged = 1;
        }
    });

    YonghuPreviousProjectItem = Views.PostItem.extend({
        tagName: 'div',
        className: 'fre-table-row',
        template: _.template($('#yonghu_previous_project_template_js').html()),
        onItemRendered: function () {
            var view = this;
            view.$('.rate-it').raty({
                readOnly: true,
                half: true,
                score: function () {
                    return view.model.get('rating_score');
                },
                hints: raty.hint
            });
        }
    });

    ListYonghuPreviousProject = Views.ListPost.extend({
        tagName: 'div',
        itemView: YonghuPreviousProjectItem,
        itemClass: 'fre-table-row'
    });

    var YonghuPreviousProjectCollection = new Collections.YonghuPreviousProjects();
    if ($('#previous_project_post_data').length > 0) {
        var data = JSON.parse($('#previous_project_post_data').html());
        YonghuPreviousProjectCollection = new Collections.YonghuPreviousProjects(data);
    }

    new ListYonghuPreviousProject({
        itemView: YonghuPreviousProjectItem,
        collection: YonghuPreviousProjectCollection,
        el: YonghuPreviousProjectTab.find('.fre-previous-table-rows')
    });
    new Views.BlockControl({
        el: $yonghu_previous,
        collection: YonghuPreviousProjectCollection,
        onBeforeFetch: function () {
            var view = this;
            view.blockUi.unblock();
            view.blockUi.block(view.$el);
            if ($yonghu_previous.find('.project-no-results').length > 0) {
                $yonghu_previous.find('.project-no-results').remove();
            }
        },
        onAfterFetch: function (result, res) {
            if (!res.success || result.length == 0) {
                $yonghu_previous.find('.fre-table').after(ae_globals.text_message.no_project);
            }
        },
        onAfterInit: function () {
            var view = this;
            this.$('.clear-filter').on('click', function (event) {
                view.clearFilter(event);
            });
        },
        clearFilter: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget);
            $(view.$el.selector).find('form')[0].reset();
            $(view.$el.selector).find('form select').trigger('chosen:updated');
            view.query['s'] = '';
            view.query['project_previous_status'] = '';
            view.fetch($target);
        }
    });

    //Modal Cancel Bid
    Views.Modal_Cancel_Bid = AE.Views.Modal_Box.extend({
        el: '#modal_cancel_bid',
        events: {
            'submit form.form-cancel-bid': 'cancelBid'
        },
        initialize: function () {
            AE.Views.Modal_Box.prototype.initialize.apply(this, arguments);
            this.blockUi = new Views.BlockUi();
        },
        cancelBid: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget),
                bid_id = this.$('#bid-id').val();
            $.ajax({
                url: ae_globals.ajaxURL,
                type: 'post',
                data: {
                    ID: bid_id,
                    action: 'ae-sync-bid',
                    method: 'remove'
                },
                beforeSend: function () {
                    view.blockUi.block($target);
                },
                success: function (res) {
                    if (res.success) {
                        $target.closest('.info-bidding').remove();
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'success'
                        });
                    } else {
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'error'
                        });
                    }
                    location.reload();
                }
            });
        }
    });

    //Modal Cancel Bid
    Views.Modal_Remove_Bid = AE.Views.Modal_Box.extend({
        el: '#modal_remove_bid',
        events: {
            'submit form.form-remove-bid': 'hideBid'
        },
        initialize: function () {
            AE.Views.Modal_Box.prototype.initialize.apply(this, arguments);
            this.blockUi = new Views.BlockUi();
        },
        hideBid: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget),
                bid_id = this.$('#bid-id').val();
            $.ajax({
                url: ae_globals.ajaxURL,
                type: 'post',
                data: {
                    ID: bid_id,
                    action: 'ae-bid-hide'
                },
                beforeSend: function () {
                    view.blockUi.block($target);
                },
                success: function (res) {
                    if (res.success) {
                        $target.closest('.info-bidding').remove();
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'success'
                        });
                    } else {
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'error'
                        });
                    }
                    location.reload();
                }
            });
        }
    });

    //Modal Archive Project
    Views.Modal_Archive_Project = AE.Views.Modal_Box.extend({
        el: '#modal_archive_project',
        events: {
            'submit form.form-archive-project': 'archiveProject'
        },
        initialize: function () {
            AE.Views.Modal_Box.prototype.initialize.apply(this, arguments);
            this.blockUi = new Views.BlockUi();
        },
        archiveProject: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget),
                project_id = this.$('#project-id').val();
            $.ajax({
                url: ae_globals.ajaxURL,
                type: 'post',
                data: {
                    ID: project_id,
                    action: 'ae-project-action',
                    method: 'archive'
                },
                beforeSend: function () {
                    view.blockUi.block($target);
                },
                success: function (res) {
                    if (res.success) {
                        $target.closest('.info-bidding').remove();
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'success'
                        });
                    } else {
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'error'
                        });
                    }
                    location.reload();
                }
            });
        }
    });

    //Modal Delete Project
    Views.Modal_Delete_Project = AE.Views.Modal_Box.extend({
        el: '#modal_delete_project',
        events: {
            'submit form.form-delete-project': 'deleteProject'
        },
        initialize: function () {
            AE.Views.Modal_Box.prototype.initialize.apply(this, arguments);
            this.blockUi = new Views.BlockUi();
        },
        deleteProject: function (event) {
            event.preventDefault();
            var view = this,
                $target = $(event.currentTarget),
                project_id = this.$('#project-id').val();
            $.ajax({
                url: ae_globals.ajaxURL,
                type: 'post',
                data: {
                    ID: project_id,
                    action: 'ae-project-action',
                    method: 'delete'
                },
                beforeSend: function () {
                    view.blockUi.block($target);
                },
                success: function (res) {
                    if (res.success) {
                        $target.closest('.info-bidding').remove();
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'success'
                        });
                    } else {
                        AE.pubsub.trigger('ae:notification', {
                            msg: res.msg,
                            notice_type: 'error'
                        });
                    }
                    location.reload();
                }
            });
        }
    });


})(jQuery, AE.Views, AE.Models, AE.Collections);