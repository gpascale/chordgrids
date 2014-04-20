var app = window.ChordGrids = (window.ChordGrids || {});

var fileVersion = 2;

app.ChordGridPage = Backbone.Model.extend({
    defaults: function() {
        return {
            title: null,
            grids: new app.ChordGridCollection(),
            version: fileVersion
        };
    },

    save: function() {
        var res = { grids: [ ] };
        _.each(this.get('grids').models, function(model) {
            var encoded = model.encode();
            if (encoded)
                res.grids.push(model.encode());
        });
        res.version = fileVersion;
        // TODO - this should probably be in the PageView or something
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
            case 2:
                var m = [ ];
                for (var i = 0; i < json.grids.length; ++i) {
                    var data = json.grids[i];
                    var model = new app.ChordGrid().decode(data);
                    m.push(model);
                }
                m.push(new app.ChordGrid());
                this.set('title', json.title || '');
                this.get('grids').set(m);
                break;
            case 1: {
                var m = [ ];
                for (var i = 0; i < json.grids.length; ++i) {
                    var data = json.grids[i];
                    var model = new app.ChordGrid().decodeOld(data);
                    m.push(model);
                }
                m.push(new app.ChordGrid());
                this.set('title', json.title || '');
                this.get('grids').set(m);
                break;
            }
            case null:
            case undefined:
            case 0:
            default: {
                var m = [ ];
                for (var i = 0; i < json.length; ++i) {
                    var data = json[i];
                    var model = new app.ChordGrid().decodeOld(data);
                    m.push(model);
                }
                m.push(new app.ChordGrid());
                this.get('grids').set(m);
                break;
            }
        }

        
    }
});