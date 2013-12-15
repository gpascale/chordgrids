var app = window.ChordGrids = (window.ChordGrids || {});

var fileVersion = 1;

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
        var res = { grids: [ ] };
        _.each(this.models, function(model) {
            var encoded = model.encode();
            if (encoded)
                res.grids.push(model.encode());
        });
        res.version = fileVersion;
        res.title = $('.titleInput').val();
        return JSON.stringify(res);
    },

    load: function(str) {
        var json = JSON.parse(str);
        var version = json.version || 0;
        this.loadVersioned(json, version);
    },

    loadVersioned: function(json, version) {
        switch (version) {
            case 1: {
                var m = [ ];
                for (var i = 0; i < json.grids.length; ++i) {
                    var data = json.grids[i];
                    var model = new app.ChordGrid().decode(data);
                    m.push(model);
                }
                m.push(new app.ChordGrid());
                $('.titleInput').val(json.title || '');
                this.set(m);
                break;
            }
            case null:
            case undefined:
            case 0:
            default: {
                var m = [ ];
                for (var i = 0; i < json.length; ++i) {
                    var data = json[i];
                    var model = new app.ChordGrid().decode(data);
                    m.push(model);
                }
                m.push(new app.ChordGrid());
                this.set(m);
                break;
            }
        }

        
    }
});