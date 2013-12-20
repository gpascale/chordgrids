
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
    var pageView = new app.ChordGridPageView({ model: page }).render();
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
                "data": [[0,0,0,0,0,0],[0,0,0,1,0,1],[0,0,0,0,1,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]
            }),
            new app.ChordGrid({ 
                "name": "",
                "fret": 1,
                "data": [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
            })
        ];
        page.get('grids').set(arr);
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
            pageView.load(str);
            popup.modal('hide');
        }
    }

    function savePage() {
        var str = col.save('update');
        console.log(str);
        var saveModal = app.Templates.SaveModal({ data: str });
        var popup = $(saveModal);
        popup.modal('show');
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
                gridCollectionView.play();
                $this.removeClass('disabled');
            });
        }
        else {
            gridCollectionView.stop();
        }
    });
    $('.printBtn').click(function() {
        var content = $('#content').clone();
        content.find('svg').each(function(idx, svg){
            var $svg = $(svg);
            var svgText = $svg.eq(0).parent().html();
            var start = svgText.indexOf('<svg');
            var end = svgText.lastIndexOf('</svg>') + 6;
            svgText = svgText.slice(start, end);

            var canvas = $('<canvas></canvas>')[0];
            //canvas.style.cssText = document.defaultView.getComputedStyle(svg, "").cssText;
            canvg(canvas, svgText);
            $svg.replaceWith($(canvas));
        });

        document.body.appendChild(content[0]);

        setTimeout(function() {
            html2canvas(content, {
                onrendered: function(canvas) {
                    document.body.removeChild(content[0]);
                    document.body.appendChild(canvas);
                    var canvas2 = $('<canvas></canvas>').css({width: 1800, height: 1200})[0];
                    var tCtx = canvas2.getContext("2d");
                    tCtx.drawImage(canvas, 0, 0, 1800, 1200);
                    var imgData = canvas2.toDataURL("image/png");
                    //var doc = new jsPDF();
                    //doc.addImage(imgData, 'JPEG', 0, 0, 1024, 768);
                    //doc.save();
                    //document.body.removeChild(canvas);
                    var img = new Image;
                    img.src = imgData; // Assume valid data
                    document.body.appendChild(img);
                },
            });
        });
        
        //

        
                
                /*var doc = new jsPDF('p', 'in', 'letter');
                var body = $('#content').get(0);
                doc.fromHTML(body, 0.5, 0.5, { 
                    'width': 7.5,
                    'elementHandlers': { }
                });
                doc.save();*/
        //    }
        //});
    })

    /*
    gridCollectionView.on('playbackStarted', function() {
        $('.playBtn').removeClass('playBtn').addClass('stopBtn').text('Stop');
    });
    gridCollectionView.on('playbackStopped', function() {
        $('.stopBtn').removeClass('stopBtn').addClass('playBtn').text('Play');
    });*/

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

    $('.titleInput').on('keypress', function(e) {
        if (e.keyCode == 13)
            this.blur();
    });
});