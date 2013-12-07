
var app = window.ChordGrids = (window.ChordGrids || {});

app.App = new Marionette.Application();

app.App.addInitializer(function() {
    // Basic layout - TODO move this into a region or some shit
    var col = new app.ChordGridCollection();
    var gridCollectionView = new app.ChordGridCollectionView({ collection: col }).render();
    var controlsView = new app.ControlsView().render();
    controlsView.on('zoom', function(delta) {
        gridCollectionView.doZoom(delta);
    });
    $('#content').append(gridCollectionView.$el);
    $('#content').append(controlsView.$el);

    // Start off with a new page
    newPage();

    // Zooming
    $('body').on('mousewheel', function(e) {
        if (e.metaKey) {
            var delta = 1.0 - e.originalEvent.deltaY / 100;
            var focalPoint = { x: e.clientX, y: e.clientY };
            gridCollectionView.doZoom(delta, focalPoint);
            return false;
        }
    });

    function newPage() {
        var arr = [ 
            new app.ChordGrid({ 
                "name": "G Maj",
                "fret": 7,
                "data": [[0,0,0,0,0,0],[0,0,0,1,0,1],[0,0,0,0,1,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]
            }),
            new app.ChordGrid({ 
                "name": "",
                "fret": 1,
                "data": [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
            })
        ];
        col.set(arr);
    }

    function loadPage() {
        var loadModal = app.Templates.LoadModal();
        var popup = $(loadModal);
        popup.modal('show');
        popup.on('click', '.loadPopupLoadBtn', doLoad);
        popup.on('keypress', 'input', function(e) {
            if (e.keyCode == 13)
                doLoad();
        })
        popup.on('click', 'a', function() {
            popup.find('input').val($(this).attr('data'));
            doLoad();
        })
        function doLoad() {
            var str = popup.find('input').val();
            col.load(str);
            popup.modal('hide');
        }
    }

    function savePage() {
        var str = col.save('update');
        console.log(str);
        var saveModal = app.Templates.SaveModal({ data: str });
        var popup = $(saveModal);
        popup.modal('show');

        /*
        
        var popup = $('<div class="popup"></div>');
        var popupContainer = $('<div class=popupContainer></div>').append(popup);
        $('body').append($('<div class="popupOverlay">'));
        $('body').append(popupContainer);
        str = str.replace()
        var popupDiv = _.template($('#SavePopupTemplate').html())();
        popup.append(popupDiv);
        */
    }

    $('.loadBtn').click(function() {
        loadPage();
    });
    $('.saveBtn').click(function() {
        savePage();
    });
    $('.newBtn').click(function() {
        newPage();
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