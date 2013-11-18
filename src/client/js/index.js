(function() {
	var app = window.ChordGrids = (window.ChordGrids || {});

	$(document).ready(function() {
		var gridView = new app.ChordGridView().render();
		$('body').append(gridView.$el);
		
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