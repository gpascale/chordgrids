var app = window.ChordGrids = (window.ChordGrids || {});

app.playback = {

	_initialized: false,

	initialize: function(callback) {
		if (this._initialized) {
			setTimeout(callback, 0);
			return;
		}

		var instrumentName = "acoustic_guitar_nylon";

		var self = this;
		MIDI.loadPlugin({
	                soundfontUrl: "ext/static/soundfont/",
	                instrument: instrumentName,
	                callback: function() {
	                	var instNumber = MIDI.GeneralMIDI.byName[instrumentName].number;
	                	for (var i = 0; i < 6; ++i)
	                		MIDI.programChange(i, instNumber);
	                	self._initialized = true;
	                    callback && callback();
	                }
	        });
	},

	play: function(chordGrid) {
		var data = chordGrid.get('data');
		var capo = chordGrid.get('fret') - 1;

		var maxSymbol = 0;
		for (var string = 0; string < 6; ++string)
			for (var fret = 0; fret < 6; ++fret)
				if (data[fret][string] > maxSymbol)
					maxSymbol = data[fret][string];
		var mult = 1 / maxSymbol;

		for (var string = 0; string < 6; ++string) {
			for (var fret = 0; fret < 6; ++fret) {
				if (data[fret][string]) {
					var note = this._getNote(capo + fret, string);
					MIDI.setVolume(string, 127);
					MIDI.noteOn(string, note, 127, mult * (data[fret][string] - 1));
					MIDI.noteOff(string, note, .9);
				}
			}
		}
	},

	_getNote: function(fret, string) {
		var lowE = 40;
		var offsets = [ 0, 5, 10, 15, 19, 24 ];
		return lowE + offsets[string] + fret;
	}

};