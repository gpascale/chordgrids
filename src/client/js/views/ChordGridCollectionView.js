var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridCollectionView = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'chordGridCollectionView',
    _zoom: 1,
    _timeout: null,

    initialize: function() {
        this.itemView = app.ChordGridView;
    },

    onRender: function() {
        this.$el.empty();
    },

    buildItemView: function(item, ItemViewType, itemViewOptions) {
        var self = this;
        var options = _.extend({
            model: item
        }, itemViewOptions);
        var el = 
        options = _.extend({
            el: el
        }, options);
        var view = new ItemViewType(options);
        view.$el.addClass();
        view.on('edited', function() {
            if (view.model.cid == self.collection.last().cid)
                self.collection.add(new app.ChordGrid());
        })
        return view;
    },

    appendHtml: function(collectionView, itemView, index) {
        this.el.appendChild(itemView.el);
    },

    doZoom: function(delta, focalPoint) {
        if (!focalPoint)
            focalPoint = { x: 450, y: 550 };

        var newZoom = Math.max(0.25, Math.min(4, this._zoom * delta));
        if (newZoom != this._zoom) {
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

            this.$el.parent().width(this._zoom * 918);
            this.$el.parent().height(this._zoom * 1068);
            window.scrollTo(newScrollX, newScrollY);
        }
        return false;
    }
});