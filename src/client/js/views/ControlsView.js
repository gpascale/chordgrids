var app = window.ChordGrids = (window.ChordGrids || {});

app.ControlsView = Marionette.ItemView.extend({
    template: app.Templates.ControlsView,
    className: 'controlsView',
    events: {
        'click .btn.zoomIn': '_doZoom',
        'click .btn.zoomOut': '_doZoom'
    },

    onRender: function() {
        //this.$el.css({ top: window.innerHeight - 100 });
    },

    _doZoom: function(e) {
        var delta = 1.0;
        if ($(e.target).hasClass('zoomIn'))
            delta = 1.1;
        else
            delta = 1 / 1.1;
        this.trigger('zoom', delta);
    }
});
