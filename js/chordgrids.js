;(function() {
this["ChordGrids"] = this["ChordGrids"] || {};
this["ChordGrids"]["Templates"] = this["ChordGrids"]["Templates"] || {};

this["ChordGrids"]["Templates"]["ChordGridPageView"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="chordGridPageHeader">\n    <input placeholder="Untitled" class="titleInput"></input>\n</div>\n<div class="chordGridPageBody">\n</div>';return __p};

this["ChordGrids"]["Templates"]["ChordGridView"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<input class="chordName" value=""></input>\n<a href="#" class="deleteBtn">X</a>\n<input class="fretNumber" value="1"></input>\n<svg width="300px" height="300px"></svg>\n<div class="insertRegion">\n    <button class="btn insertBtn">+</btn>\n</div>';return __p};

this["ChordGrids"]["Templates"]["ControlsView"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<button class="btn btn-large zoomIn">+</button>\n<button class="btn btn-large zoomOut">-</button>';return __p};

this["ChordGrids"]["Templates"]["HelpModal"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="helpModal modal fade" id="test_modal">\n  <div class="modal-body">\n    <h1>Welcome to ChordGrids!</h1>\n    <h4>Editing a Grid</h4>\n    <p>To edit a chord, click on the desired fret/string to cycle through the available shapes (circle, X, square, triangle, none). Click on the number in the upper left to edit the fret. Click on the area above the grid to edit the title.</p>\n    <p>You can zoom in and out by holding the option key and using the scrollwheel.</p>\n    <h4>Adding a Grid</h4>\n    <p>As you edit the last grid on the page, a new one will automatically be added at the end.</p>\n    <h4>Deleting a Grid</h4>\n    <p>To delete a grid, hover over it and then click the "X" that appears above and to the right,</p>\n    <h4>Saving and Loading Pages</h4>\n    <p>Right now, saving and loading takes a bit of manual effort. To save a page of chord grids, click the save button and copy the text that appears in the pop up. Save this text somewhere you can find it later</p>\n    <p>To load a page: Click the load button. When the popup appears, paste in the text from a previously saved grid, and then click load. Or, click one of the items in the list to load one of the example pages.</p>\n  </div>\n  <div class="modal-footer">\n    <a href="#" class="btn" data-dismiss="modal">Close</a>\n  </div>\n</div>';return __p};

this["ChordGrids"]["Templates"]["LoadModal"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="loadModal modal fade" id="test_modal">\n  <div class="modal-body">\n    <button class="btn btn-large btn-primary loadPopupLoadFileBtn">\n      Load a file from your computer\n    </button>\n    <div class="loadModalOr">\n      <p>or select one of the example pages</p>\n     <!-- <p>OR</p>\n      <p>Select from the list of example pages</p>-->\n    </div>\n    <div class="loadModalExamples">\n      <ul>\n        <li class="loadModalExample" >\n          <a href="#" data=\'[{"n":"D","f":"5","d":"111134143233244332"},{"n":"G","f":"3","d":"101121131312324441451"},{"n":"C","f":"5","d":"132144234311333401424523"},{"n":"F","f":"5","d":"131141151321411"},{"n":"B","f":"5","d":"141151232301321"},{"n":"Bb","f":"3","d":"132141331401521"},{"n":"Bb","f":"3","d":"121142331401"},{"n":"E","d":"221302331341351"},{"n":"E","d":"221331342401"},{"n":"A","d":"221231241501"},{"n":"A","d":"231243333521"},{"n":"D","f":"4","d":"131211341432"},{"n":"A","f":"4","d":"201221331341"}]\'>Ted Greene: Autumn Leaves</a>\n        </li>\n        <li class="loadModalExample" >\n          <a href="#" data=\'{"grids":[{"n":"F m7","f":"8","d":"111131241321"},{"n":"Bb m7","f":"8","d":"121241251331"},{"n":"Eb 9","f":"8","d":"141331401421"},{"n":"Eb 7 b9","f":"8","d":"141231401421"},{"n":"Ab 7","f":"8","d":"131141152321411"},{"n":"Db maj 7","f":"4","d":"111231321341"},{"n":"G 7","f":"3","d":"101121231441552"},{"n":"C maj 7","f":"3","d":"111231321341"},{"n":"C m7","f":"3","d":"111131241321"},{"n":"F m7","f":"3","d":"121241251331"},{"n":"Bb 9","f":"3","d":"141331401421"},{"n":"Bb 7 b9","f":"3","d":"141231401421"},{"n":"Eb maj 7","f":"3","d":"131141321411"},{"n":"Ab maj 7","f":"4","d":"101221231311"},{"n":"A m7","f":"3","d":"142243301321331"},{"n":"D 7","f":"3","d":"141221311331"},{"n":"G maj 7","f":"3","d":"101221231311"},{"n":"G 6/9","f":"2","d":"111121131241"},{"n":"G 6","f":"7","d":"111131241321452"},{"n":"A m7/11","f":"8","d":"141231321351"},{"n":"A m7","f":"7","d":"121232241251331"},{"n":"D 9","f":"4","d":"121211231241"},{"n":"D 7 b9","f":"7","d":"121141231251"},{"n":"G maj 7","f":"5","d":"121331341351"}],"version":1,"title":"ATTYA Chord Melody - Ted Greene"}\'>Ted Greene: ATTYA Chord Melody</a>\n        </li>\n        <li class="loadModalExample" >\n          <a href="#" data=\'{"grids":[{"n":"F maj 7","f":"8","d":"111152231321341"},{"n":"E m7b5","f":"7","d":"111131221242"},{"n":"A7","f":"5","d":"101121231441"},{"n":"D m7","f":"9","d":"201221231241"},{"n":"Db m7 b6","f":"9","d":"101121131241"},{"n":"C m9","f":"8","d":"101121131141152351"},{"n":"B 13","f":"7","d":"101121231242341"},{"n":"Bb 6","f":"5","d":"121201241331"},{"n":"Bb m6","f":"5","d":"121201231241442"},{"n":"F maj 7","f":"8","d":"111231321341"},{"n":"F / A","f":"10","d":"121131311441"},{"n":"D 13","f":"10","d":"101121231341351"},{"n":"D 7 #9 #5","f":"9","d":"111221231251341"},{"n":"G m7","f":"8","d":"121152311331441"},{"n":"C 13","f":"8","d":"101121231341"},{"n":"E 7 #9","f":"11","d":"111221231"},{"n":"A 7","f":"10","d":"111131221441"},{"n":"D 7","f":"9","d":"111131221541"},{"n":"G 7","f":"8","d":"111131221352"},{"n":"C 7 #5","f":"7","d":"111131221341"},{"n":"G m7","f":"8","d":"121311331441"},{"n":"G m7","f":"3","d":"101121131141"},{"n":"C 13","f":"8","d":"101121231341"},{"n":"C 13 / E","f":"7","d":"111131221441"},{"n":"F maj7","f":"5","d":"131241311321"},{"n":"Eb 9","f":"5","d":"121211231241"},{"n":"F maj7","f":"5","d":"131241311321"},{"n":"E m7b5","f":"7","d":"111131221242441"},{"n":"A 7 alt","f":"10","d":"111131221242441"},{"n":"D m","f":"5","d":"111242321331"},{"n":"G m6","f":"2","d":"121201231241251452"},{"n":"D m","f":"5","d":"111243321332"},{"n":"Bb 7","f":"6","d":"101121231311"},{"n":"D m","f":"5","d":"111242321331"},{"n":"G m6","f":"2","d":"121201231241251452"},{"n":"D m7","f":"5","d":"111131152241321451"},{"n":"G 13 b9","f":"7","d":"151211321331341"},{"n":"D m","f":"10","d":"101132321"},{"n":"D m nat7","f":"10","d":"101142221331"},{"n":"D m7","f":"10","d":"101121131152441"},{"n":"B m11","f":"12","d":"121151311331441"},{"n":"E 7","f":"11","d":"111131221541"},{"n":"A 7 #9","f":"10","d":"111131142221441"},{"n":"D 7","f":"9","d":"111131221541"},{"n":"G 9","f":"8","d":"111221231341"},{"n":"C 7","f":"7","d":"111131221241"}],"version":1,"title":"Georgia - Tim Lerch"}\'>Tim Lerch: Georgia on My Mind</a>\n        </li>\n        <li class="loadModalExample">\n          <a class="loadModalExample"href="#" data=\'{"grids":[{"n":"Maj 7 - 1","d":"151241252331422"},{"n":"Maj 7 - 1","d":"132141351441452"},{"n":"Maj 7 - 1","d":"151332341551"},{"n":"Maj 7 - 2","d":"131141151242321451"},{"n":"Maj 7 - 2","d":"122331341442521"},{"n":"Maj 7 - 2","d":"131222431441542"},{"n":"Maj 7 - 3","d":"112231321332511"},{"n":"Maj 7 - 3","d":"121212331421432"},{"n":"Maj 7 - 3","d":"121132311402521"},{"n":"Dom 7 - 1","d":"132141251441452"},{"n":"Dom 7 - 1","d":"151341352431522"},{"n":"Dom 7 - 1","d":"141152231322441"},{"n":"Dom 7 - 2","d":"131222341431542"},{"n":"Dom 7 - 2","d":"122241331442521"},{"n":"Dom 7 - 2","d":"131242321412431"},{"n":"Dom 7 - 3","d":"121212231421432"},{"n":"Dom 7 - 3","d":"112131321332511"},{"n":"Dom 7 - 3","d":"221232411502521"},{"n":"Min 7 - 1","d":"131141152322441"},{"n":"Min 7 - 1","d":"151331341352522"},{"n":"Min 7 - 1","d":"132251431441452"},{"n":"Min 7 - 1","d":"151241332451"},{"n":"Min 7 - 2","d":"131221242412431"},{"n":"Min 7 - 2","d":"122241331421442"},{"n":"Min 7 - 3","d":"221232311502521"},{"n":"Min 7 - 3","d":"111131321332411"},{"n":"Min 7 - 3","d":"121312331521532"},{"n":"Min 7b5 - 1","d":"131152322431441"},{"n":"Min 7b5 - 1","d":"132251341431452"},{"n":"Min 7b5 - 2","d":"221242412431521"},{"n":"Min 7b5 - 2","d":"131321342512531"},{"n":"Min 7b5 - 2","d":"122231241421442"},{"n":"Min 7b5 - 3","d":"121232311502521"},{"n":"Min 7b5 - 3","d":"112131221332411"}],"version":1,"title":"Descending Arps - Upper String Roots"}\'>Descending Arps</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class="modal-footer">\n    <a href="#" class="btn" data-dismiss="modal">Cancel</a>\n  </div>\n</div>';return __p};

this["ChordGrids"]["Templates"]["MainLayout"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div id="mainRegion">\n</div>';return __p};

this["ChordGrids"]["Templates"]["SaveModal"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="saveModal modal fade" id="test_modal">\n  <div class="modal-body">\n    <p>Copy and paste this string to save your page</p>\n    <input class="foo" value=\'' +((__t = ( data.data )) == null ? '' : __t) +'\' autofocus></input>\n  </div>\n  <div class="modal-footer">\n    <a href="#" class="btn" data-dismiss="modal">Close</a>\n  </div>\n</div>';return __p};
})();
(function() {

var app = window.ChordGrids = (window.ChordGrids || {});

app.App = new Marionette.Application();

app.MainLayout = Marionette.Layout.extend({
    template: app.Templates.MainLayout,
    className: 'MainLayout',
    regions: {
        main: '#mainRegion'
    }
});

app.App.addInitializer(function() {
    this.addRegions({ mainRegion: '#content' });
    var layout = new app.MainLayout();
    this.mainRegion.show(layout);

    // Basic layout - TODO move this into a region or some shit
    var page = new app.ChordGridPage();
    var pageView = new app.ChordGridPageView({ model: page });
    layout.main.show(pageView);

    // Start off with a new page
    newPage();

    // Zooming
    $('body').mousewheel(function(e, delta) {
        if (e.metaKey) {
            var delta = 1.0 + delta / 100;
            var focalPoint = { x: e.clientX, y: e.clientY };
            pageView.doZoom(delta, focalPoint);
            return false;
        }
    });

    function newPage() {
        var arr = [ 
            new app.ChordGrid({ 
                "name": "G Maj",
                "fret": 7,
                "data": [[0,0,0,0,0,0],[0,0,0,1,0,1],[0,0,0,0,1,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
            }),
            new app.ChordGrid({ 
                "name": "",
                "fret": 1,
                "data": [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
            })
        ];
        page.get('grids').set(arr);
    }

    function loadPage() {
        var loadModal = app.Templates.LoadModal();
        var popup = $(loadModal);
        popup.modal('show');
        popup.on('click', '.loadPopupLoadFileBtn', function() {
            var $hiddenFileInput = $('#fileUploadInput');
            $hiddenFileInput.on('change', function() {
                var reader = new FileReader();
                reader.onload = function() {
                    doLoad(reader.result);
                    // TODO: handle failure
                };
                reader.readAsText(this.files[0]);
                return false;
            });
            $hiddenFileInput.click();
        });
        popup.on('click', '.loadModalExample a', function() {
            doLoad($(this).attr('data'));
            return false;
        })
        function doLoad(str) {
            pageView.load(str);
            popup.modal('hide');
        }
    }

    function savePage() {
        var str = page.save();
        console.log(str);

        var a = document.createElement('a');
        var title = page.get('title') || '';
        title = title.replace(/\/\\/g, '_');
        a.setAttribute('download', title + '.cgpage');
        a.href = "data:text/plain;charset=utf-8;base64," + window.btoa(str);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    $('.newBtn').click(function() {
        newPage();
    });
    $('.loadBtn').click(function() {
        loadPage();
    });
    $('.saveBtn').click(function() {
        savePage();
    });
    $('.helpBtn').click(function() {
        var helpModal = app.Templates.HelpModal();
        $(helpModal).modal('show');
        $(helpModal, '.btn').click(function() {
            $(helpModal).modal('hide');
        })
    });
    $('.playBtn').click(function() {
        var $this = $(this);
        if ($(this).hasClass('disabled'))
            return;
        if ($this.hasClass('playBtn')) {
            $this.addClass('disabled');
            app.playback.initialize(function() {
                pageView.play();
                $this.removeClass('disabled');
            });
        }
        else {
            pageView.stop();
        }
    });

    pageView.on('playbackStarted', function() {
        $('.playBtn').removeClass('playBtn').addClass('stopBtn').text('Stop');
    });
    pageView.on('playbackStopped', function() {
        $('.stopBtn').removeClass('stopBtn').addClass('playBtn').text('Play');
    });

    $('.modal').on('keypress', function(e) {
        console.log(e.keyCode);
    });

    $('body').on('click', '.popupContainer', function() {
        closePopup();
    });
    $('body').on('click', '.popup', function() {
        return false;
    })
    $('body').on('click', '.loadDiv a', function() {
        $('.loadDiv').find('input').val($(this).attr('data'));
    });
    
    function closePopup() {
        $('.popupOverlay').remove();
        $('.popupContainer').remove();
    }
});
})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});
app.common = app.common = (app.common || { });
app.common.makeSVG = function(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
};
})();
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
})();
(function() {
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
})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

var fileVersion = 1;

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
            case 1: {
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
                this.get('grids').set(m);
                break;
            }
        }

        
    }
});
})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

app.playback = {

	_initialized: false,

	initialize: function(callback) {
		if (this._initialized) {
			setTimeout(callback, 0);
			return;
		}

		var instrumentName = "acoustic_guitar_nylon";

		var self = this;
		MIDI.loadPlugin({
	                soundfontUrl: "ext/static/soundfont/",
	                instrument: instrumentName,
	                callback: function() {
	                	var instNumber = MIDI.GeneralMIDI.byName[instrumentName].number;
	                	for (var i = 0; i < 6; ++i)
	                		MIDI.programChange(i, instNumber);
	                	self._initialized = true;
	                    callback && callback();
	                }
	        });
	},

	play: function(chordGrid) {
		var data = chordGrid.get('data');
		var capo = chordGrid.get('fret') - 1;

		var maxSymbol = 0;
		for (var string = 0; string < 6; ++string)
			for (var fret = 0; fret < 6; ++fret)
				if (data[fret][string] > maxSymbol)
					maxSymbol = data[fret][string];
		var mult = 1 / maxSymbol;

		for (var string = 0; string < 6; ++string) {
			for (var fret = 0; fret < 6; ++fret) {
				if (data[fret][string]) {
					var note = this._getNote(capo + fret, string);
					MIDI.setVolume(string, 127);
					MIDI.noteOn(string, note, 127, mult * (data[fret][string] - 1));
					MIDI.noteOff(string, note, .9);
				}
			}
		}
	},

	_getNote: function(fret, string) {
		var lowE = 40;
		var offsets = [ 0, 5, 10, 15, 19, 24 ];
		return lowE + offsets[string] + fret;
	}

};
})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridCollectionView = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'chordGridCollectionView',
    _zoom: 1,
    _playbackTimeout: null,

    initialize: function() {
        this.itemView = app.ChordGridView;
    },

    onRender: function() {
        this.$el.empty();
    },

    onBeforeClose: function() {
        $(window).unbind('resize');
    },

    buildItemView: function(item, ItemViewType, itemViewOptions) {
        var self = this;
        var options = _.extend({
            model: item
        }, itemViewOptions);
        var el = 
        options = _.extend({
            el: el
        }, options);
        var view = new ItemViewType(options);
        view.$el.addClass();
        view.on('edited', function() {
            if (view.model.cid == self.collection.last().cid)
                self.collection.add(new app.ChordGrid());
        });
        view.on('insertAfter', function() {
            var index = self.collection.indexOf(this.model) + 1;
            console.log("adding at index " + index);
            self.collection.add(new app.ChordGrid(), { at: index });
        });
        return view;
    },


    appendHtml: function(collectionView, itemView, index) {
        if (index <= 0)
            collectionView.$el.prepend(itemView.el);
        else if (index < collectionView.$el.children().length)
            collectionView.$('.chordGridView:nth-child(' + (index + 1) + ')').before(itemView.el);
        else
            collectionView.$el.append(itemView.el);
    },

    play: function() {
        this.trigger('playbackStarted');
        var self = this;
        var idx = 0;
        playNext();
        function playNext() {
            if (idx < self.collection.models.length) {
                var itemView = self.children.findByIndex(idx);
                itemView.$el.css('background-color', 'yellow');
                app.playback.play(self.collection.models[idx]);
                ++idx;
                _playbackTimeout = setTimeout(function() {
                    itemView.$el.css('background-color', 'white');
                    playNext();
                }, 1000);
            }
            else {
                self.trigger('playbackStopped');
            }
        }
    },

    stop: function(e) {
        this.trigger('playbackStopped');
        clearTimeout(_playbackTimeout);
        this.$('.chordGridView').css('background-color', 'white');
    }
});

})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridPageView = Marionette.ItemView.extend({
    template: app.Templates.ChordGridPageView,
    className: 'chordGridPageView',
    model: app.ChordGridPage,
    events: {
        'keypress input': '_onInputKeypress'
    },

    onRender: function() {
        var self = this;

        this.$('.chordGridPageHeader .titleInput').val(this.model.get('title'));

        var grids = this.options.model.get('grids');
        this._collectionView = new app.ChordGridCollectionView({ collection: grids });
        this.$('.chordGridPageBody').append(this._collectionView.render().$el);

        this._collectionView.on('playbackStarted', function() {
            self.trigger('playbackStarted');
        });
        this._collectionView.on('playbackStopped', function() {
            self.trigger('playbackStopped');
        });

        $(window).bind('resize', _.bind(this._resizeHandler, this));
        this._resizeHandler();
    },

    onBeforeClose: function() {
        $(window).unbind('resize');
        this._collectionView.off('playbackStarted');
        this._collectionView.off('playbackStopped');
    },

    _resizeHandler: function() {
        var zoom = $(window).width() / 1800;
        this.setZoom(zoom);
        return;
    },

    play: function() {
        this._collectionView.play();
    },

    stop: function() {
        this._collectionView.stop();
    },

    load: function(str) {
        this.model.load(str);
        this.$('.chordGridPageHeader .titleInput').val(this.model.get('title'));
    },

    doZoom: function(delta, focalPoint) {
        this.setZoom(this._zoom * delta, focalPoint);
        return false;
    },

    setZoom: function(newZoom, focalPoint) {
        if (!focalPoint)
            focalPoint = { x: 900, y: 0 };
        console.log('setZoom ' + newZoom + '   focal point ' + focalPoint.x + ' ' + focalPoint.y);
        newZoom = Math.max(0.25, Math.min(4, newZoom));
        if (this._zoom == newZoom)
            return;
        var delta = newZoom / this._zoom;
        this._zoom = newZoom;
        $(this.el).css({ 
            '-webkit-transform': 'scale(' + this._zoom + ', ' + this._zoom + ')',
            '-webkit-transform-origin': '0 0',
            '-webkit-transform-style': 'flat' });

        var focusX = window.scrollX + focalPoint.x;
        var focusY = window.scrollY + focalPoint.y;
        var newFocusX = focusX * delta;
        var newFocusY = focusY * delta;
        var newScrollX = newFocusX - focalPoint.x;
        var newScrollY = newFocusY - focalPoint.y;

        this.$el.parent().width(this._zoom * this.$el.width());
        window.scrollTo(newScrollX, newScrollY);
    },

    _onInputKeypress: function(e) {
        if (e.keyCode == 13) {
            this.model.set('title', this.$('.titleInput').val());
            $(e.currentTarget).blur();
            return false;
        }
    }
});
})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

app.ChordGridView = Marionette.ItemView.extend({
    template: app.Templates.ChordGridView,
    className: 'chordGridView',
    tagName: 'div',
    events: {
        'click svg': '_onClick',
        'keypress input': '_onInputKeypress',
        'blur input': '_onInputBlur',
        'click .deleteBtn': '_onDeleteBtnClick',
        'click .insertBtn': '_onInsertBtnClick'
    },
    model: app.ChordGrid,

    initialize: function(params) {
        this.numFrets = 6;
        this.fretWidth = 4;
        this.stringWidth = 2;
        this.stringSpacing = 19;
        this.fretSpacing = 26;
        this.symbolR = 9;
        this.padding = { left: 10, top: 5, right: 10, bottom: 5 };
        this.width = this.padding.left + this.padding.right + this.stringWidth + 5 * (this.stringSpacing + this.stringWidth);
        this.height = this.padding.top + this.padding.bottom + this.fretWidth + this.numFrets * (this.fretSpacing + this.fretWidth);
        this.dataSVG = [ ];
        for (var i = 0; i < this.numFrets + 1; ++i)
            this.dataSVG.push([]);
        this.x = 0;
        this.y = 0;
        this.$el.addClass('unedited');
    },

    _coords: function(fret, string) {
        return [ this.padding.left + 0.5 * this.stringWidth + string * (this.stringSpacing + this.stringWidth),
                 this.padding.top + 0.5 * this.fretWidth + fret * (this.fretSpacing + this.fretWidth) - 0.5 * this.fretSpacing - 0.5 * this.fretWidth ];
    },

    _nearest: function(x, y) {
        var nearestFret = -1;
        var nearestFretDist = 100000;
        for (var i = 0; i < this.numFrets + 1; ++i) {
            var dist = Math.abs(y - (this._coords(i, 0)[1]));
            if (dist < nearestFretDist) {
                nearestFretDist = dist;
                nearestFret = i;
            }
        }
        var nearestString = -1;
        var nearestStringDist = 100000;
        for (var i = 0; i < 6; ++i) {
            var dist = Math.abs(x - (this._coords(0, i)[0]));
            if (dist < nearestStringDist) {
                nearestStringDist = dist;
                nearestString = i;
            }
        }

        return [ nearestFret, nearestString ];
    },

    onRender: function() {
        this.svgEl = this.$('svg').get(0);

        // Background
        var background = app.common.makeSVG('rect', {
            x: this.padding.left - 5,
            y: this.padding.top - 5,
            width: this.width - this.padding.left - this.padding.right + 10,
            height: this.height - this.padding.top - this.padding.bottom + 10,
            fill: "none"
        });
        $(background).addClass('background');
        this.svgEl.appendChild(background);

        // Frets
        for (var i = 0; i < this.numFrets + 1; ++i) {
            var fret = app.common.makeSVG('line', {
                x1: this.padding.left,
                x2: this.width - this.padding.right,
                y1: this.padding.top + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                y2: this.padding.top + 0.5 * this.fretWidth + i * (this.fretSpacing + this.fretWidth),
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.fretWidth
            });
            this.svgEl.appendChild(fret);
        }

        // Strings
        for (var i = 0; i < 6; ++i) {
            var string = app.common.makeSVG('line', {
                y1: this.padding.top,
                y2: this.height - this.padding.bottom,
                x1: this.padding.left + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                x2: this.padding.left + i * (this.stringSpacing + this.stringWidth) + 0.5 * this.stringWidth,
                stroke: 'rgb(0, 0, 0)',
                'stroke-width': this.stringWidth
            });
            this.svgEl.appendChild(string);
        }

        // Synchronize with model
        this.$('.chordName').val(this.model.get('name'));
        this.$('.fretNumber').val(this.model.get('fret'));
        var data = this.model.get('data');
        for (var fret = 0; fret < this.numFrets + 1; ++fret) {
            for (var string = 0; string < 6; ++string) {
                if (data[fret][string])
                    this.setSymbol(fret, string, data[fret][string]);
            }
        }

        $(this.svgEl).width(this.width).height(this.height);
    },

    setSymbol: function(fret, string, symbol) {
        var data = this.model.get('data');
        data[fret][string] = symbol;
        this.model.set('data', data);

        var c = this._coords(fret, string);
        var symbol = this._createSymbol(data[fret][string], c);            
        this.dataSVG[fret][string] = symbol;
        if (symbol)
            this.svgEl.appendChild(symbol);
        this.$el.removeClass('unedited');
    },

    _createSymbol: function(type, c) {
        switch (type) {
            case app.Symbol.None: default:
                return null;
            case 1: {
                var dot = app.common.makeSVG('circle', {
                    cx: c[0],
                    cy: c[1],
                    r: this.fretSpacing / 3,
                    fill: 'rgb(0, 0, 0)'
                });
                return dot;
            }
            case 2: {
                var r = this.fretSpacing * (15 / 60);
                var l1 = app.common.makeSVG('line', {
                    x1: c[0] - this.symbolR,
                    x2: c[0] + this.symbolR,
                    y1: c[1] - this.symbolR,
                    y2: c[1] + this.symbolR,
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretSpacing / 8
                });
                var l2 = app.common.makeSVG('line', {
                    x1: c[0] - this.symbolR,
                    x2: c[0] + this.symbolR,
                    y1: c[1] + this.symbolR,
                    y2: c[1] - this.symbolR,
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretSpacing / 8
                });
                var x = app.common.makeSVG('g');
                x.appendChild(l1);
                x.appendChild(l2);
                return x;
            }
            case 3: {
                var rect = app.common.makeSVG('rect', {
                    width: 2 * this.symbolR,
                    height: 2 * this.symbolR,
                    x: c[0] - this.symbolR,
                    y: c[1] - this.symbolR,
                    fill: 'transparent',
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretSpacing / 8
                });
                return rect;
            }
            case 4: {
                var points = [ c[0] - this.symbolR, c[1] + this.symbolR,
                               c[0], c[1] - this.symbolR,
                               c[0] + this.symbolR, c[1] + this.symbolR,
                               c[0] - this.symbolR, c[1] + this.symbolR,
                               c[0], c[1] - this.symbolR ].toString();
                var tri = app.common.makeSVG('polyline', {
                    points: points,
                    fill: 'none',
                    stroke: 'rgb(0, 0, 0)',
                    'stroke-width': this.fretSpacing / 8
                });
                return tri;
            }
        }
    },

    _onClick: function(e) {
        var offset = $(e.currentTarget).offset();
        var $svg = this.$('svg');
        var rect = $svg.get(0).getBoundingClientRect();
        var clickX = (e.clientX - rect.left) * $svg.width() / rect.width;
        var clickY = (e.clientY - rect.top) * $svg.height() / rect.height;
        var n = this._nearest(clickX, clickY);
        var fret = n[0];
        var string = n[1];
        if (this.model.get('data')[fret][string]) {
            if (this.dataSVG[fret][string]) {
                this.svgEl.removeChild(this.dataSVG[fret][string]);
                this.dataSVG[fret][string] = null;
            }
        }

        var symbol = (this.model.get('data')[fret][string] + 1 + 5) % 5;
        this.setSymbol(fret, string, symbol);
        this.trigger('edited');
        this.$el.removeClass('unedited');
        return false;
    },

    _onInputKeypress: function(e) {
        this.trigger('edited');
        this.$el.removeClass('unedited');
        if (e.keyCode == 13) {
            $(e.target).blur();
            return false;
        }
    },

    _onInputBlur: function(e) {
        if ($(e.target).hasClass('chordName'))
            this.model.set('name', $(e.target).val());
        else
            this.model.set('fret', $(e.target).val());
    },

    _onDeleteBtnClick: function(e) {
        this.model.destroy();
    },

    _onInsertBtnClick: function(e) {
        this.trigger('insertAfter');
    }
});

})();
(function() {
var app = window.ChordGrids = (window.ChordGrids || {});

app.ControlsView = Marionette.ItemView.extend({
    template: '#ControlsViewTemplate',
    className: 'controlsView',
    events: {
        'click .btn.zoomIn': '_doZoom',
        'click .btn.zoomOut': '_doZoom'
    },

    onRender: function() {
        this.$el.css({ top: window.innerHeight - 100 });
    },

    _doZoom: function(e) {
        var delta = 1.0;
        if ($(e.target).hasClass('zoomIn'))
            delta = 1.1;
        else
            delta = 1 / 1.1;
        this.trigger('zoom', delta);
    }
});
})();
