var app = window.ChordGrids = (window.ChordGrids || {});
app.common = app.common = (app.common || { });

app.common.makeSVG = function(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
};

app.common.createSymbol = function(symbolType, c, r) {
    switch(symbolType) {
        case app.Symbol.Circle:
            return app.common.makeSVG('circle', {
                cx: c[0],
                cy: c[1],
                r: r,
                fill: 'rgb(0, 0, 0)'
            });
        case app.Symbol.X: {
            var l1 = app.common.makeSVG('line', {
                x1: c[0] - r,
                x2: c[0] + r,
                y1: c[1] - r,
                y2: c[1] + r,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': 4
            });
            var l2 = app.common.makeSVG('line', {
                x1: c[0] - r,
                x2: c[0] + r,
                y1: c[1] + r,
                y2: c[1] - r,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': 4
            });
            var x = app.common.makeSVG('g');
            x.appendChild(l1);
            x.appendChild(l2);
            return x;
        }
        case app.Symbol.Square:
            return app.common.makeSVG('rect', {
                width: 2 * r,
                height: 2 * r,
                x: c[0] - r,
                y: c[1] - r,
                fill: 'transparent',
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': 4
            });
        case app.Symbol.Triangle: {
            var points = [ c[0] - r, c[1] + r,
                           c[0], c[1] - r,
                           c[0] + r, c[1] + r,
                           c[0] - r, c[1] + r,
                           c[0], c[1] - r ].toString();
            return app.common.makeSVG('polyline', {
                points: points,
                fill: 'none',
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': 4
            });
        }
    }
}