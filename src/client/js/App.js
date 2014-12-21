
var app = window.ChordGrids = (window.ChordGrids || {});

app.firebase = new Firebase("https://chordgrids.firebaseio.com");

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
                "name": "",
                "fret": 1,
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

    for (var i = 0; i < app.Symbol.Count; ++i) {
        var svg = app.common.makeSVG('svg');
        svg.appendChild(app.common.createSymbol(i, [10, 10], 8));
        svg.setAttribute('width', '20px');
        svg.setAttribute('height', '20px');
        var content = $('<div/>')
                .addClass('symbolDropdownEntry')
                .append(svg)
                .append($('<span> (' + i + ') </span>'));
        $('.symbolDropdown .dropdown-menu').append($('<li/>').append($('<a href="#"/>').append(content)));
    }

    $('.nav .dropdown-menu li a').on('click', function(e) {
        var idx = $(this).parent().index();
        var svg = app.common.makeSVG('svg');
        svg.appendChild(app.common.createSymbol(idx, [10, 10], 8));
        svg.setAttribute('width', '20px');
        svg.setAttribute('height', '20px');
        $('.nav .dropdown-toggle .svgContainer').html(svg);
        app.currentSymbol = idx;
        console.log('current symbol: ' + app.currentSymbol);
    })

    $($('.nav .dropdown-menu').children()[0]).find('a').trigger('click');
});

app.currentSymbol = 0;
$(document).on('keypress', function(e) {
    if (e.keyCode >= 49 && e.keyCode <= 52) {
        $($('.nav .dropdown-menu').children()[e.keyCode - 49]).find('a').trigger('click');
    }
});