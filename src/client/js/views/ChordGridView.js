(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    var makeSVG = function(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    };

    var padding = 40;
    var fretWidth = 10;
    var fretSpacing = 60;
    var stringWidth = 5;
    var stringSpacing = 50;

    var width = 2 * padding + 6 * stringWidth + 5 * stringSpacing;
    var height = 2 * padding + 6 * fretWidth + 5 * fretSpacing;

    function coords(fret, string) {
        return [ padding + 0.5 * stringWidth + string * (stringSpacing + stringWidth),
                 padding + 0.5 * fretWidth + fret * (fretSpacing + fretWidth) - 0.5 * fretSpacing - 0.5 * fretWidth ];

    }

    function nearest(x, y) {
        var nearestFret = -1;
        var nearestFretDist = 100000;
        for (var i = 0; i < 5; ++i) {
            var dist = Math.abs(y - (coords(i, 0)[1]));
            if (dist < nearestFretDist) {
                nearestFretDist = dist;
                nearestFret = i;
            }
        }
        var nearestString = -1;
        var nearestStringDist = 100000;
        for (var i = 0; i < 6; ++i) {
            var dist = Math.abs(x - (coords(0, i)[0]));
            if (dist < nearestStringDist) {
                nearestStringDist = dist;
                nearestString = i;
            }
        }

        return [ nearestFret, nearestString ];
    }

    app.ChordGridView = Marionette.ItemView.extend({
        template: '#ChordGridTemplate',
        className: 'chordGridView',
        events: {
            'click': 'onClickFoo'
        },

        initialize: function() {
            this.data = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];
            this.dataSVG = [ [], [], [], [], [], [] ];
        },

        onRender: function() {
            console.log("ChordGridView render!");

            this.$svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
                'width="' + width + '" height="' + height + '"></svg>').get(0);

            // Frets
            for (var i = 0; i < 6; ++i) {
                var fret = makeSVG('line', {
                    x1: padding,
                    x2: width - padding,
                    y1: padding + 0.5 * fretWidth + i * (fretSpacing + fretWidth),
                    y2: padding + 0.5 * fretWidth + i * (fretSpacing + fretWidth),
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': fretWidth
                });
                this.$svg.appendChild(fret);
            }

            // Strings
            for (var i = 0; i < 6; ++i) {
                var string = makeSVG('line', {
                    y1: padding,
                    y2: height - padding,
                    x1: padding + i * (stringSpacing + stringWidth) + 0.5 * stringWidth,
                    x2: padding + i * (stringSpacing + stringWidth) + 0.5 * stringWidth,
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': stringWidth
                });
                this.$svg.appendChild(string);
            }

            this.$el.append(this.$svg);

            this.$el.width(width);
            this.$el.height(height);
        },

        onClickFoo: function(e) {
            var n = nearest(e.offsetX, e.offsetY);
            var fret = n[0];
            var string = n[1];
            if (this.data[fret][string]) {
                if (this.dataSVG[fret][string]) {
                    this.$svg.removeChild(this.dataSVG[fret][string]);
                    this.dataSVG[fret][string] = null;
                }
            }

            this.data[fret][string] = (this.data[fret][string] + 1 + 5) % 5;

            var c = coords(fret, string);
            switch(this.data[fret][string]) {
                case 0: default:
                    break;
                case 1: {
                    var dot = makeSVG('circle', {
                        cx: c[0],
                        cy: c[1],
                        r: fretSpacing / 3,
                        fill: 'rgb(0, 0, 0)'
                    });
                    this.dataSVG[fret][string] = dot;
                    this.$svg.appendChild(dot);
                    break;
                }
                case 2: {
                    var r = fretSpacing * (15 / 60);
                    var l1 = makeSVG('line', {
                        x1: c[0] - r,
                        x2: c[0] + r,
                        y1: c[1] - r,
                        y2: c[1] + r,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': fretSpacing / 12
                    });
                    var l2 = makeSVG('line', {
                        x1: c[0] - r,
                        x2: c[0] + r,
                        y1: c[1] + r,
                        y2: c[1] - r,
                        stroke: 'rgb(0, 0, 0)',
                        'stroke-width': fretSpacing / 12
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
                        width: fretSpacing * .6,
                        height: fretSpacing * .6,
                        x: c[0] - fretSpacing / 3,
                        y: c[1] - fretSpacing / 3,
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