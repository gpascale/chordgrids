var app = window.ChordGrids = (window.ChordGrids || {});

app.playback = {

	_initialized: false,

	initialize: function(callback) {
		if (this._initialized) {
			setTimeout(callback, 0);
			return;
		}

		var self = this;
		MIDI.loadPlugin({
	                soundfontUrl: "ext/static/soundfont/",
	                instrument: "acoustic_grand_piano",
	                callback: function() {
	                	self._initialized = true;
	                    callback && callback();
	                }
	        });
	},

	play: function(chordGrid) {
		var data = chordGrid.get('data');
		var capo = chordGrid.get('fret') - 1;
		for (var string = 0; string < 6; ++string) {
			for (var fret = 0; fret < 6; ++fret) {
				if (data[fret][string]) {
					var note = this._getNote(capo + fret, string);
					MIDI.setVolume(string, 127);
					MIDI.noteOn(string, note, 127, 0.25 * (data[fret][string] - 1));
					MIDI.noteOff(string, note, .9);
				}
			}
		}
	},

	_getNote: function(fret, string) {
		var lowE = 52;
		var offsets = [ 0, 5, 10, 15, 19, 24 ];
		return lowE + offsets[string] + fret;
	}

};