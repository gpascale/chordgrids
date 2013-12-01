(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    app.Controls = Marionette.ItemView.extend({
        template: '#ControlsTemplate',
        events: {
            'click .btn.zoomIn': '_doZoom',
            'click .btn.zoomOut': '_doZoom',
        },

        _doZoom: function(e) {
            var delta = 1.0;
            if $(e.target).hasClass('zoomIn')
                delta = 1.1;
            else
                delta = 1 / 1.1;
            this.trigger('zoom', delta);
        }
    });
})();
        