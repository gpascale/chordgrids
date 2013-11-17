(function() {
	var app = window.ChordGrids = (window.ChordGrids || { });

	$(document).ready(function() {
/*
		var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
			'width="' + 400 + '" height="' + 400 + '"></svg>').get(0);
		$('body').html(svg);
*/
		var gridView = new app.ChordGridView();
		$('body').append(gridView.$el);

	});
/*
			// Nut
			var nut = makeSVG('line', { 
				x1: 10, y1: 0, x2: 10, y2: this._fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': 20 
			});
			svg.appendChild(nut);

			// Frets
			for (var i = 1; i < 15; ++i) {
				var x = 0.5 * this._nutWidth + (this._fretboardWidth - this._fretWidth) / 14 * i;
				var fret = makeSVG('line', {
					x1: x, y1: 0, x2: x, y2: this._fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': this._fretWidth
				});
				svg.appendChild(fret);
			}

			// Strings
			for (var i = 0; i < 6; ++i) {
				var y = 0.5 * this._stringWidth + (this._fretboardHeight - this._stringWidth) / 5 * i;
				var string = makeSVG('line', { 
					x1: 0, y1: y, x2: this._fretboardWidth, y2: y, stroke: 'rgb(150, 150, 150)', 'stroke-width': this._stringWidth
				});
				svg.appendChild(string);
			}
			*/
})();