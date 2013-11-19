(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    var makeSVG = function(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    };

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
            this.dataSVG = [ [], [], [], [], [], [] ];
        },

        _coords: function(fret, string) {
            return [ this.padding + 0.5 * this.stringWidth + string * (this.stringSpacing + this.stringWidth),
                     this.padding + 0.5 * this.fretWidth + fret * (this.fretSpacing + this.fretWidth) - 0.5 * this.fretSpacing - 0.5 * this.fretWidth ];
        },

        _nearest: function(x, y) {
            var nearestFret = -1;
            var nearestFretDist = 100000;
            for (var i = 0; i < 5; ++i) {
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

            this.$svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
                'width="' + this.width + '" height="' + this.height + '"></svg>').get(0);

            // Frets
            for (var i = 0; i < 6; ++i) {
                var fret = makeSVG('line', {
                    x1: this.padding,
                    x2: this.width - this.padding,
                    y1: this.padding + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                    y2: this.padding + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretWidth
                });
                this.$svg.appendChild(fret);
            }

            // Strings
            for (var i = 0; i < 6; ++i) {
                var string = makeSVG('line', {
                    y1: this.padding,
                    y2: this.height - this.padding,
                    x1: this.padding + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                    x2: this.padding + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.stringWidth
                });
                this.$svg.appendChild(string);
            }

            this.$el.append(this.$svg);

            this.$el.width(this.width);
            this.$el.height(this.height);
        },

        onClickFoo: function(e) {
            var n = this._nearest(e.offsetX, e.offsetY);
            var fret = n[0];
            var string = n[1];
            if (this.data[fret][string]) {
                if (this.dataSVG[fret][string]) {
                    this.$svg.removeChild(this.dataSVG[fret][string]);
                    this.dataSVG[fret][string] = null;
                }
            }

            this.data[fret][string] = (this.data[fret][string] + 1 + 5) % 5;

            var c = _coords(fret, string);
            switch(this.data[fret][string]) {
                case 0: default:
                    break;
                case 1: {
                    var dot = makeSVG('circle', {
                        cx: c[0],
                        cy: c[1],
                        r: this.fretSpacing / 3,
                        fill: 'rgb(0, 0, 0)'
                    });
                    this.dataSVG[fret][string] = dot;
                    this.$svg.appendChild(dot);
                    break;
                }
                case 2: {
                    var r = this.fretSpacing * (15 / 60);
                    var l1 = makeSVG('line', {
                        x1: c[0] - r,
                        x2: c[0] + r,
                        y1: c[1] - r,
                        y2: c[1] + r,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    var l2 = makeSVG('line', {
                        x1: c[0] - r,
                        x2: c[0] + r,
                        y1: c[1] + r,
                        y2: c[1] - r,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': this.fretSpacing / 12
                    });
                    var x = makeSVG('g');
                    x.appendChild(l1);
                    x.appendChild(l2);
                    this.dataSVG[fret][string] = x;
                    this.$svg.appendChild(x);
                    break;
                }
                case 3: {
                    var dot = makeSVG('rect', {
                        width: this.fretSpacing * .6,
                        height: this.fretSpacing * .6,
                        x: c[0] - this.fretSpacing / 3,
                        y: c[1] - this.fretSpacing / 3,
                        fill: 'transparent',
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': 5
                    });
                    this.dataSVG[fret][string] = dot;
                    this.$svg.appendChild(dot);
                    break;
                }
                case 4: {
                    var points = [ c[0] - 15, c[1] + 15, c[0], c[1] - 15, c[0] + 15, c[1] + 15, c[0] - 15, c[1] + 15 ].toString();
                    var tri = makeSVG('polyline', {
                        points: points,
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': 5
                    });
                    this.dataSVG[fret][string] = tri;
                    this.$svg.appendChild(tri);
                    break;
                }
            }
        }
    });
})();
