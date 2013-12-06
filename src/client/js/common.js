var app = window.ChordGrids = (window.ChordGrids || {});
app.common = app.common = (app.common || { });
app.common.makeSVG = function(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
};