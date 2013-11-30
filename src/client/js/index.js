(function() {
	var app = window.ChordGrids = (window.ChordGrids || {});

	$(document).ready(function() {
		
		var col = new app.ChordGridCollection();
		var gridCollectionView = new app.ChordGridCollectionView({ collection: col }).render();
		for (var i = 0; i < 40; ++i) {
			var cg = new app.ChordGrid()
			col.add(cg);
		}
		
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

		$('.saveBtn').click(function() {
			col.sync('update');
		});
	});
})();
