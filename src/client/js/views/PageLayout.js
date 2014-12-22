var app = window.ChordGrids = (window.ChordGrids || {});

app.PageLayout = Marionette.Layout.extend({
    className: 'PageLayout',
    template: app.Templates.PageLayout,
    el: 'body',
    regions: {
        headerRegion: '#navbar',
        contentRegion: '#content'
    },
    _pageView: null,
    _page: null,

    initialize: function() {
        console.log('pagelayout init');
        this._page = new app.ChordGridPage();
        
    },

    close: function() {
        this._headerView && this._headerView.close();
        this._pageView && this._pageView.close();
    },

    onRender: function() {
        this._headerView = new app.HeaderView();
        this._pageView = new app.ChordGridPageView({ model: this._page });
        this.headerRegion.show(this._headerView.render());
        this.contentRegion.show(this._pageView.render());
        var arr = [ new app.ChordGrid({ "name": "", "fret": 1 }) ];
        this._page.get('grids').set(arr);
        this.otherCrap();
    },

    otherCrap: function() {
        var self = this;
        $('body').mousewheel(function(e, delta) {
            if (e.metaKey) {
                var delta = 1.0 + delta / 100;
                var focalPoint = { x: e.clientX, y: e.clientY };
                self._pageView.doZoom(delta, focalPoint);
                return false;
            }
        });

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
                self._pageView.load(str);
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
                    self._pageView.play();
                    $this.removeClass('disabled');
                });
            }
            else {
                self._pageView.stop();
            }
        });

        self._pageView.on('playbackStarted', function() {
            $('.playBtn').removeClass('playBtn').addClass('stopBtn').text('Stop');
        });
        self._pageView.on('playbackStopped', function() {
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

        $(document).on('keypress', function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 52) {
                $($('.nav .dropdown-menu').children()[e.keyCode - 49]).find('a').trigger('click');
            }
        });
    }
});