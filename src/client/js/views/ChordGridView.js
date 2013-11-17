(function() {
	var app = window.ChordGrids = (window.ChordGrids || { });

	app.ChordGridView = Marionette.ItemView.extend({
		template: '#ChordGridTemplate',
		className: 'chordGridView',

		onRender: function() {
			console.log("ChordGridView render!");
		}
	});
})();