(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

/*
    var this.padding = 40;
    var this.fretWidth = 10;
    var this.fretSpacing = 60;
    var this.stringWidth = 5;
    var this.stringSpacing = 50;

    var width = 2 * padding + 6 * stringWidth + 5 * stringSpacing;
    var height = 2 * padding + 6 * this.fretWidth + 5 * fretSpacing;

    
    */

    

    app.ChordGridView = Marionette.ItemView.extend({
        template: '#ChordGridTemplate',
        className: 'chordGridView',
        tagName: 'g',
        events: {
            'click': 'onClickFoo'
        },
        model: app.ChordGrid,

        initialize: function(params) {
            this.width = params.width || 300;
            this.height = params.height || 400;
            this.padding = this.width * 0.1;
            this.fretWidth = this.width * 0.03;
            this.stringWidth = this.width * 0.015;
            this.stringSpacing = 0.2 * (this.width - 2 * this.padding - 6 * this.stringWidth);
            this.fretSpacing = 0.2 * (this.height - 2 * this.padding - 6 * this.fretWidth);
            this.symbolR = 0.05 * this.width;
            this.dataSVG = [ [], [], [], [], [], [] ];
            this.x = 0;
            this.y = 0;
        },

        setPosition: function(x, y) {
            this.x = x;
            this.y = y;
            this.$el.attr('transform', 'translate(' + x + ',' + y + ')');
        },

        _coords: function(fret, string) {
            return [ this.padding + 0.5 * this.stringWidth + string * (this.stringSpacing + this.stringWidth),
                     this.padding + 0.5 * this.fretWidth + fret * (this.fretSpacing + this.fretWidth) - 0.5 * this.fretSpacing - 0.5 * this.fretWidth ];
        },

        _nearest: function(x, y) {
            var nearestFret = -1;
            var nearestFretDist = 100000;
            for (var i = 0; i < 6; ++i) {
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
            console.log("ChordGridView render!");

            // Background
            var background = app.common.makeSVG('rect', {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height,
                fill: "rgb(255,255,255)"
            });
            this.el.appendChild(background);

            // Frets
            for (var i = 0; i < 6; ++i) {
                var fret = app.common.makeSVG('line', {
                    x1: this.padding,
                    x2: this.width - this.padding,
                    y1: this.padding + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                    y2: this.padding + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretWidth
                });
                this.el.appendChild(fret);
            }

            // Strings
            for (var i = 0; i < 6; ++i) {
                var string = app.common.makeSVG('line', {
                    y1: this.padding,
                    y2: this.height - this.padding,
                    x1: this.padding + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                    x2: this.padding + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.stringWidth
                });
                this.el.appendChild(string);
            }

            for (var fret = 0; fret < 6; ++fret) {
                for (var string = 0; string < 6; ++string) {

                }
            }

            this.$el.width(this.width);
            this.$el.height(this.height);
        },

        _symbol: function(type, c) {
            switch (type) {
                case app.Symbol.None: default:
                    return null;
                case 1: {
                    var dot = app.common.makeSVG('circle', {
                        cx: c[0],
                        cy: c[1],
                        r: this.fretSpacing / 3,
                        fill: 'rgb(0, 0, 0)'
                    });
                    return dot;
                }
                case 2: {
                    var r = this.fretSpacing * (15 / 60);
                    var l1 = app.common.makeSVG('line', {
                        x1: c[0] - this.symbolR,
                        x2: c[0] + this.symbolR,
                        y1: c[1] - this.symbolR,
                        y2: c[1] + this.symbolR,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    var l2 = app.common.makeSVG('line', {
                        x1: c[0] - this.symbolR,
                        x2: c[0] + this.symbolR,
                        y1: c[1] + this.symbolR,
                        y2: c[1] - this.symbolR,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    var x = app.common.makeSVG('g');
                    x.appendChild(l1);
                    x.appendChild(l2);
                    return x;
                }
                case 3: {
                    var rect = app.common.makeSVG('rect', {
                        width: 2 * this.symbolR,
                        height: 2 * this.symbolR,
                        x: c[0] - this.symbolR,
                        y: c[1] - this.symbolR,
                        fill: 'transparent',
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    return rect;
                }
                case 4: {
                    var points = [ c[0] - this.symbolR, c[1] + this.symbolR,
                                   c[0], c[1] - this.symbolR,
                                   c[0] + this.symbolR, c[1] + this.symbolR,
                                   c[0] - this.symbolR, c[1] + this.symbolR ].toString();
                    var tri = app.common.makeSVG('polyline', {
                        points: points,
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    return tri;
                }
            }
        },

        onClickFoo: function(e) {
            // hacky - make better
            var scale = $('.chordGridCollectionView').width() / 900;

            var normalizedX = (e.offsetX - window.scrollX) / scale - (this.x - (window.scrollX / scale));
            var normalizedY = (e.offsetY - window.scrollY) / scale - (this.y - (window.scrollY / scale));
            console.log(normalizedX + ", " + normalizedY);

            var n = this._nearest(normalizedX, normalizedY);
            var fret = n[0];
            var string = n[1];
            if (this.model.get('data')[fret][string]) {
                if (this.dataSVG[fret][string]) {
                    this.el.removeChild(this.dataSVG[fret][string]);
                    this.dataSVG[fret][string] = null;
                }
            }

            var data = this.model.get('data');
            data[fret][string] = (data[fret][string] + 1 + 5) % 5;
            this.model.set('data', data);

            var c = this._coords(fret, string);
            var symbol = this._symbol(data[fret][string], c);            
            this.dataSVG[fret][string] = symbol;
            if (symbol)
                this.el.appendChild(symbol);
        }
    });
})();
