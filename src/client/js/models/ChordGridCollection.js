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
    }
});