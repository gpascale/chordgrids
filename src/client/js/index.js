(function() {
	var app = window.ChordGrids = (window.ChordGrids || {});

	$(document).ready(function() {
		var col = new Backbone.Collection();

		var gridCollectionView = new app.ChordGridCollectionView({ collection: col });
		for (var i = 0; i < 30; ++i)
			col.add(new app.ChordGrid());

		//var gridView = new app.ChordGridView().render();
		$('body').append(gridCollectionView.$el);
		
			/*
		var nut = makeSVG('line', {
			x1: 10,
			y1: 0,
			x2: 10,
			y2: 200,
			stroke: 'rgb(0, 0, 0)',
			'stroke-width': 20
		});
		svg.appendChild(nut);
		*/

		
	});
})();
