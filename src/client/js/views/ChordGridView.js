var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridView = Marionette.ItemView.extend({
    template: app.Templates.ChordGridView,
    className: 'chordGridView',
    tagName: 'div',
    events: {
        'click svg': '_onClick',
        'keypress input': '_onInputKeypress',
        'blur input': '_onInputBlur',
        'click .deleteBtn': '_onDeleteBtnClick',
        'click .insertBtn': '_onInsertBtnClick'
    },
    model: app.ChordGrid,
    modifiers: [ false, false, false ],

    initialize: function(params) {
        this.numFrets = 6;
        this.fretWidth = 4;
        this.stringWidth = 2;
        this.stringSpacing = 19;
        this.fretSpacing = 26;
        this.symbolR = 9;
        this.padding = { left: 10, top: 5, right: 10, bottom: 5 };
        this.width = this.padding.left + this.padding.right + this.stringWidth + 5 * (this.stringSpacing + this.stringWidth);
        this.height = this.padding.top + this.padding.bottom + this.fretWidth + this.numFrets * (this.fretSpacing + this.fretWidth);
        this.dataSVG = [ ];
        for (var i = 0; i < this.numFrets + 1; ++i)
            this.dataSVG.push([]);
        this.x = 0;
        this.y = 0;
        this.$el.addClass('unedited');
    },

    _coords: function(fret, string) {
        return [ this.padding.left + 0.5 * this.stringWidth + string * (this.stringSpacing + this.stringWidth),
                 this.padding.top + 0.5 * this.fretWidth + fret * (this.fretSpacing + this.fretWidth) - 0.5 * this.fretSpacing - 0.5 * this.fretWidth ];
    },

    _nearest: function(x, y) {
        var nearestFret = -1;
        var nearestFretDist = 100000;
        for (var i = 0; i < this.numFrets + 1; ++i) {
            var dist = Math.abs(y - (this._coords(i, 0)[1]));
            if (dist < nearestFretDist) {
                nearestFretDist = dist;
                nearestFret = i;
            }
        }
        var nearestString = -1;
        var nearestStringDist = 100000;
        for (var i = 0; i < 6; ++i) {
            var dist = Math.abs(x - (this._coords(0, i)[0]));
            if (dist < nearestStringDist) {
                nearestStringDist = dist;
                nearestString = i;
            }
        }

        return [ nearestFret, nearestString ];
    },

    onRender: function() {
        this.svgEl = this.$('svg').get(0);

        // Background
        var background = app.common.makeSVG('rect', {
            x: this.padding.left - 5,
            y: this.padding.top - 5,
            width: this.width - this.padding.left - this.padding.right + 10,
            height: this.height - this.padding.top - this.padding.bottom + 10,
            fill: "none"
        });
        $(background).addClass('background');
        this.svgEl.appendChild(background);

        // Frets
        for (var i = 0; i < this.numFrets + 1; ++i) {
            var fret = app.common.makeSVG('line', {
                x1: this.padding.left,
                x2: this.width - this.padding.right,
                y1: this.padding.top + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                y2: this.padding.top + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretWidth
            });
            this.svgEl.appendChild(fret);
        }

        // Strings
        for (var i = 0; i < 6; ++i) {
            var string = app.common.makeSVG('line', {
                y1: this.padding.top,
                y2: this.height - this.padding.bottom,
                x1: this.padding.left + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                x2: this.padding.left + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.stringWidth
            });
            this.svgEl.appendChild(string);
        }

        // Synchronize with model
        this.$('.chordName').val(this.model.get('name'));
        this.$('.fretNumber').val(this.model.get('fret'));
        var data = this.model.get('data');
        for (var fret = 0; fret < this.numFrets + 1; ++fret) {
            for (var string = 0; string < 6; ++string) {
                if (this.model.hasSymbol(fret, string))
                    this.setSymbol(fret, string, data[fret][string]);
            }
        }

        $(this.svgEl).width(this.width).height(this.height);
    },

    setSymbol: function(fret, string, symbol) {
        var data = this.model.get('data');
        data[fret][string] = symbol;
        this.model.set('data', data);

        var c = this._coords(fret, string);
        var symbol = this._createSymbol(data[fret][string], c);            
        this.dataSVG[fret][string] = symbol;
        if (symbol)
            this.svgEl.appendChild(symbol);
        this.$el.removeClass('unedited');
    },

    _createSymbol: function(symbolData, c) {
        var g = app.common.makeSVG('g');
        if (symbolData[app.Symbol.Circle]) {
            var r = this.symbolR * 0.9;
            var dot = app.common.makeSVG('circle', {
                cx: c[0],
                cy: c[1],
                r: r,
                fill: 'rgb(0, 0, 0)'
            });
            g.appendChild(dot);
        }
        if (symbolData[app.Symbol.X]) {
            var r = 1.2 * this.symbolR;
            var l1 = app.common.makeSVG('line', {
                x1: c[0] - r,
                x2: c[0] + r,
                y1: c[1] - r,
                y2: c[1] + r,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretSpacing / 8
            });
            var l2 = app.common.makeSVG('line', {
                x1: c[0] - r,
                x2: c[0] + r,
                y1: c[1] + r,
                y2: c[1] - r,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretSpacing / 8
            });
            var x = app.common.makeSVG('g');
            x.appendChild(l1);
            x.appendChild(l2);
            g.appendChild(x);
        }
        if (symbolData[app.Symbol.Square]) {
            var d = 2.4 * this.symbolR;
            var rect = app.common.makeSVG('rect', {
                width: d,
                height: d,
                x: c[0] - (d * 0.5),
                y: c[1] - (d * 0.5),
                fill: 'transparent',
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretSpacing / 8
            });
            g.appendChild(rect);
        }
        if (symbolData[app.Symbol.Triangle]) {
            var r = 1.2 * this.symbolR;
            var points = [ c[0] - r, c[1] + r,
                           c[0], c[1] - r,
                           c[0] + r, c[1] + r,
                           c[0] - r, c[1] + r,
                           c[0], c[1] - r ].toString();
            var tri = app.common.makeSVG('polyline', {
                points: points,
                fill: 'none',
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretSpacing / 8
            });
            g.appendChild(tri);
        }

        return g;
    },

    _onClick: function(e) {
        var offset = $(e.currentTarget).offset();
        var $svg = this.$('svg');
        var rect = $svg.get(0).getBoundingClientRect();
        var clickX = (e.clientX - rect.left) * $svg.width() / rect.width;
        var clickY = (e.clientY - rect.top) * $svg.height() / rect.height;
        var n = this._nearest(clickX, clickY);
        var fret = n[0];
        var string = n[1];
        if (this.model.get('data')[fret][string]) {
            if (this.dataSVG[fret][string]) {
                this.svgEl.removeChild(this.dataSVG[fret][string]);
                this.dataSVG[fret][string] = null;
            }
        }

        var symbolData = (this.model.get('data')[fret][string]);
        var symbol = app.currentSymbol;
        if (!symbolData[symbol])
            symbolData[symbol] = 1;
        else
            delete symbolData[symbol];

        this.setSymbol(fret, string, symbolData);
        this.trigger('edited');
        this.$el.removeClass('unedited');
        return false;
    },

    _onInputKeydown: function(e) {
        if (e.keyCode == 27)
            modifiers[0] = true;
    },

    _onInputKeyup: function(e) {
        if (e.keyCode == 27)
            modifiers[0] = true;
    },

    _onInputKeypress: function(e) {
        this.trigger('edited');
        this.$el.removeClass('unedited');
        if (e.keyCode == 13) {
            $(e.target).blur();
            return false;
        }
    },

    _onInputBlur: function(e) {
        if ($(e.target).hasClass('chordName'))
            this.model.set('name', $(e.target).val());
        else
            this.model.set('fret', $(e.target).val());
    },

    _onDeleteBtnClick: function(e) {
        this.model.destroy();
    },

    _onInsertBtnClick: function(e) {
        this.trigger('insertAfter');
    }
});
