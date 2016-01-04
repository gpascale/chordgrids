var app = window.ChordGrids = (window.ChordGrids || {});

app.Symbol = {
    Circle: 0,
    X: 1,
    Square: 2,
    Triangle: 3,
}

function encodeDatum(datum) {
    var num = 0;
    for (var i = app.Symbol.Circle; i < app.Symbol.Count; ++i)
        num |= (datum[i] << i);
    return '0123456789ABCDEF'[num];
}

function decodeDatum(symbol) {
    var datum = { };
    var num = '0123456789ABCDEF'.indexOf(symbol);
    for (var i = app.Symbol.Circle; i < app.Symbol.Count; ++i)
        if (num & (1 << i))
            datum[i] = 1;
    return datum;
}

app.ChordGrid = Backbone.Model.extend({
    defaults: function() {
        return  {
            name: '',
            fret: 1,
            data: [
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }],
                [{ }, { }, { }, { }, { }, { }]
            ]
        };
    },

    hasSymbol: function(fret, string) {
        var datum = this.get('data')[fret][string];
        return datum[app.Symbol.Circle] ||
               datum[app.Symbol.X] ||
               datum[app.Symbol.Square] ||
               datum[app.Symbol.Triangle];
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
                if (this.hasSymbol(fret, string))
                    ret.d += fret + '' + string + '' + encodeDatum(data[fret][string]);
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
            var val = d[2];
            data[fret][string] = decodeDatum(val);
            d = d.substr(3);
        }
        this.set('data', data);
        return this;
    },

    decodeOld: function(encoded) {
        this.set('name', encoded.n || '');
        this.set('fret', encoded.f || 1);
        var data = this.defaults().data;
        var d = encoded.d;
        while(d && d.length >= 3) {
            var s = d.substr(0, 3);
            var fret = d[0] - '0';
            var string = d[1] - '0';
            var val = d[2] - '0' - 1;
            var datum = { };
            if (val >= 0)
            datum[val] = 1;
            data[fret][string] = datum;
            d = d.substr(3);
        }
        this.set('data', data);
        return this;
    }

});