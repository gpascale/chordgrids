(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    app.ChordGridCollectionView = Marionette.CollectionView.extend({
        itemView: app.ChordGridView,
        tagName: 'div',
        className: 'chordGridCollectionView',
        _zoom: 1,
        _timeout: null,

        onRender: function() {
            var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
                    'width="100%"></svg>').get(0);      

            this._svgRoot = app.common.makeSVG('g');
            svg.appendChild(this._svgRoot);
            this.$el.append($(svg));
        },

        buildItemView: function(item, ItemViewType, itemViewOptions) {
            var options = _.extend({
                model: item,
                width: 100,
                height: 133
            }, itemViewOptions);
            var el = app.common.makeSVG('g', {
                width: '300px',
                height: '300px'
            });
            options = _.extend({
                el: el
            }, options);
            var view = new ItemViewType(options);
            var self = this;
            $('body').on('mousewheel', function(e) {
                self._mousewheeled(e);
            })
            var textNode = app.common.makeSVG('text', { x: 50, y: 50 });
            $(textNode).text("weeeee");
            el.appendChild(textNode);
            return view;
        },

        appendHtml: function(collectionView, itemView, index) {
            var xOffset = index % 7 * 130;
            var yOffset = Math.floor(index / 7) * 160;
            itemView.setPosition(xOffset, yOffset);
            this._svgRoot.appendChild(itemView.el);
        },

        doZoom: function(delta, focalPoint) {
            if (!focalPoint)
                focalPoint = { x: 450, y: 550 };

            this._zoom = Math.max(0.25, Math.min(4, this._zoom * delta));
            $(this._svgRoot).css('-webkit-transform', 'scale(' + this._zoom + ', ' + this._zoom + ')');

            var focusX = window.scrollX + focalPoint.x;
            var focusY = window.scrollY + focalPoint.y;
            var newFocusX = focusX * delta;
            var newFocusY = focusY * delta;
            var newScrollX = newFocusX - focalPoint.x;
            var newScrollY = newFocusY - focalPoint.y;

            this.$el.width(this._zoom * 900);
            this.$el.height(this._zoom * 1100);
            window.scrollTo(newScrollX, newScrollY);
            return false;
        },

        _mousewheeled: function(e, delta) {
/*
                if (this._timeout)
                    clearTimeout(this._timeout);
                var self = this;
                this._timeout = setTimeout(function() {
                    var width = self._zoom * self.$el.parent().parent().width();
                    var height = self._zoom * self.$el.parent().parent().height();
                    //console.log("screen coords = (" + e.screenX + ", " + e.screenY + ")");
                    self.$el.parent().width(self._zoom * self.$el.parent().parent().width());
                    self.$el.parent().height(self._zoom * self.$el.parent().parent().height());
                    window.scrollTo(e.screenX / $(window).width() * width, e.screenY / $(window).height() * height);
                }, 200);
*/
        },
    });
}());