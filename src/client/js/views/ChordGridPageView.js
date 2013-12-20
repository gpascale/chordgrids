var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridPageView = Marionette.ItemView.extend({
    template: app.Templates.ChordGridPageView,
    className: 'chordGridPageView',
    model: app.ChordGridPage,

    initialize: function(params) {

    },

    onRender: function() {
        this.$('.chordGridPageHeader .titleInput').val(this.model.get('title'));

        var grids = this.options.model.get('grids');
        this._collectionView = new app.ChordGridCollectionView({ collection: grids });
        this.$('.chordGridPageBody').append(this._collectionView.render().$el);

        $(window).bind('resize', _.bind(this._resizeHandler, this));
        this._resizeHandler();
    },

    onBeforeClose: function() {
        $(window).unbind('resize');
    },

    _resizeHandler: function() {
        var zoom = $(window).width() / 1800;
        this.setZoom(1.0);
        return;
    },

    load: function(str) {
        this.model.load(str);
        this.$('.chordGridPageHeader .titleInput').val(this.model.get('title'));
    },

    doZoom: function(delta, focalPoint) {
        this.setZoom(this._zoom * delta, focalPoint);
        return false;
    },

    setZoom: function(newZoom, focalPoint) {
        if (!focalPoint)
            focalPoint = { x: 900, y: 0 };
        console.log('setZoom ' + newZoom + '   focal point ' + focalPoint.x + ' ' + focalPoint.y);
        newZoom = Math.max(0.25, Math.min(4, newZoom));
        if (this._zoom == newZoom)
            return;
        var delta = newZoom / this._zoom;
        this._zoom = newZoom;
        $(this.el).css({ 
            '-webkit-transform': 'scale(' + this._zoom + ', ' + this._zoom + ')',
            '-webkit-transform-origin': '0 0',
            '-webkit-transform-style': 'flat' });

        var focusX = window.scrollX + focalPoint.x;
        var focusY = window.scrollY + focalPoint.y;
        var newFocusX = focusX * delta;
        var newFocusY = focusY * delta;
        var newScrollX = newFocusX - focalPoint.x;
        var newScrollY = newFocusY - focalPoint.y;

        this.$el.parent().width(this._zoom * this.$el.width());
        window.scrollTo(newScrollX, newScrollY);
    }
});