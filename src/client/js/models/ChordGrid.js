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
            name: '',
            fret: 1,
            data: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ]
        };
    },

    encode: function() {
        var ret = { };
        var name = this.get('name');
        if (name)
            ret.n = name;
        var fret = this.get('fret');
        if (fret != 1)
            ret.f = fret;
        var data = this.get('data');
        ret.d = '';
        for (var fret = 0; fret < 6; ++fret) {
            for (var string = 0; string < 6; ++string) {
                if (data[fret][string] != 0)
                    ret.d += fret + '' + string + '' + data[fret][string];
            }
        }
        if (ret.d == '')
            delete ret.d;
        if (_.isEmpty(ret))
            return null;
        return ret;
    },

    decode: function(encoded) {
        this.set('name', encoded.n || '');
        this.set('fret', encoded.f || 1);
        var data = this.defaults().data;
        var d = encoded.d;
        while(d && d.length >= 3) {
            var s = d.substr(0, 3);
            var fret = d[0] - '0';
            var string = d[1] - '0';
            var val = d[2] - '0';
            data[fret][string] = val;
            d = d.substr(3);
        }
        this.set('data', data);
        return this;
    }

});