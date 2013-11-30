;(function() {
    var app = window.ChordGrids = (window.ChordGrids || { });

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

        load: function(str) {
            var m = [ ];
            while(str.length) {
                var g = str.substring(0, 36);
                str = str.substring(36);
                var model = new app.ChordGrid();
                var data = model.get('data');
                for (var i = 6; i < 36; ++i) {
                    var row = Math.floor(i / 6);
                    var col = Math.floor(i % 6);
                    data[row][col] = parseInt(g[i]);
                }
                m.push(model);
            }
            console.dir(m);
            this.set(m);
        }
    });
}());