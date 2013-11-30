(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    app.ChordGridCollectionView = Marionette.CollectionView.extend({
        itemView: app.ChordGridView,
        tagName: 'div',
        className: 'chordGridCollectionView',
        _zoom: 1,
        _timeout: null,

        onRender: function() {
            this.$el.empty();
            var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
                    'width="100%"></svg>').get(0);
            this._svgRoot = app.common.makeSVG('g');
            svg.appendChild(this._svgRoot);
            this.$el.append($(svg));
            console.log("REEEENDDAAAAAAA");
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
            return view;
        },

        appendHtml: function(collectionView, itemView, index) {
            console.log("appendify " + itemView.el);
            var xOffset = index % 6 * itemView.width;
            var yOffset = Math.floor(index / 6) * itemView.height;
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

            this.$el.width(this._zoom * 918);
            this.$el.height(this._zoom * 1068);
            window.scrollTo(newScrollX, newScrollY);
            return false;
        }
    });
}());