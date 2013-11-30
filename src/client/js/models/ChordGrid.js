(function() {
    var app = window.ChordGrids = (window.ChordGrids || {});

    app.Symbol = {
        None: 0,
        Circle: 1,
        X: 2,
        Square: 3,
        Triangle: 4
    }

    app.ChordGrid = Backbone.Model.extend({
        defaults: function() {
            return  {
                fret: 0,
                data: [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 3, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0],
                    [0, 1, 0, 2, 0, 0],
                    [0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            };
        }

    });
}());