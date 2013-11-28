(function() {
	var app = window.ChordGrids = (window.ChordGrids || {});

	$(document).ready(function() {
		
		var col = new Backbone.Collection();
		var gridCollectionView = new app.ChordGridCollectionView({ collection: col }).render();
		for (var i = 0; i < 60; ++i)
			col.add(new app.ChordGrid());
		
		var controlsView = new app.ControlsView().render();
		controlsView.on('zoom', function(delta) {
			gridCollectionView.doZoom(delta);
		});

		$('#content').append(gridCollectionView.$el);
		$('#content').append(controlsView.$el);

		$('body').on('mousewheel', function(e) {
			if (e.metaKey) {
				var delta = 1.0 - e.originalEvent.deltaY / 100;
				var focalPoint = { x: e.clientX, y: e.clientY };
				gridCollectionView.doZoom(delta, focalPoint);
			}
		});
	});
})();
