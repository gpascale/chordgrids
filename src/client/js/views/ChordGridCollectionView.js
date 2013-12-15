var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridCollectionView = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'chordGridCollectionView',
    _zoom: 1,
    _playbackTimeout: null,

    initialize: function() {
        this.itemView = app.ChordGridView;
    },

    onRender: function() {
        this.$el.empty();
        $(window).bind('resize', _.bind(this._resizeHandler, this));
        this._resizeHandler();
    },

    onBeforeClose: function() {
        $(window).unbind('resize');
    },

    _resizeHandler: function() {
        var zoom = $(window).width() / 1800;
        this.setZoom(zoom);
        return;
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
        });
        view.on('insertAfter', function() {
            var index = self.collection.indexOf(this.model) + 1;
            console.log("adding at index " + index);
            self.collection.add(new app.ChordGrid(), { at: index });
        });
        return view;
    },


    appendHtml: function(collectionView, itemView, index) {
        if (index <= 0)
            collectionView.$el.prepend(itemView.el);
        else if (index < collectionView.$el.children().length)
            collectionView.$('.chordGridView:nth-child(' + (index + 1) + ')').before(itemView.el);
        else
            collectionView.$el.append(itemView.el);
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
    },

    play: function() {
        this.trigger('playbackStarted');
        var self = this;
        var idx = 0;
        playNext();
        function playNext() {
            if (idx < self.collection.models.length) {
                var itemView = self.children.findByIndex(idx);
                itemView.$el.css('background-color', 'yellow');
                app.playback.play(self.collection.models[idx]);
                ++idx;
                _playbackTimeout = setTimeout(function() {
                    itemView.$el.css('background-color', 'white');
                    playNext();
                }, 1000);
            }
            else {
                self.trigger('playbackStopped');
            }
        }
    },

    stop: function(e) {
        this.trigger('playbackStopped');
        clearTimeout(_playbackTimeout);
        this.$('.chordGridView').css('background-color', 'white');
    }
});
