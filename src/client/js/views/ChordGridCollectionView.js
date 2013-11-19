(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    app.ChordGridCollectionView = Marionette.CollectionView.extend({
        itemView: app.ChordGridView,

        buildItemView: function(item, ItemViewType, itemViewOptions) {
            var options = _.extend({ model: item, width: 100, height: 133 }, itemViewOptions);
            var view = new ItemViewType(options);
            return view;
        }
    });
}());