var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridCollection = Backbone.Collection.extend({
    model: app.ChordGrid,
    sync: function(method, model, options) {
        switch(method) {
            case 'read':
                console.log('read ' + model);
                break;
            case 'create':
            case 'update':
                var str = '';
                _.each(this.models, function(model) {
                    var data = model.get('data');
                    _.each(data, function(row) {
                        str += row.join('');
                    });
                });
                console.log(str);
                break;
        }
        if (options && options.success)
            options.success('SHUCKSHESH!');
    },

    save: function() {
        var res = [ ];
        _.each(this.models, function(model) {
            res.push(model.toJSON());
        });
        console.log("save data: " + JSON.stringify(res));
        return JSON.stringify(res);
    },

    load: function(str) {
        var m = [ ];
        var json = JSON.parse(str);
        for (var i = 0; i < json.length; ++i) {
            var data = json[i];
            var model = new app.ChordGrid({
                name: data.name,
                fret: data.fret,
                data: data.data
            });
            m.push(model);
        }
        m.push(new app.ChordGrid());
        this.set(m);
    }
});