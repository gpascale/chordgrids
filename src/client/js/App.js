var app = window.ChordGrids = (window.ChordGrids || {});

app.App = new Marionette.Application();

var MyRouter = Backbone.Marionette.AppRouter.extend({
    /* standard routes can be mixed with appRoutes/Controllers above */
    routes : {
        "": "home",
        "home": "home",
        "profile" : "user"
    },
    _currentLayout: null,

    home: function() {
        this._currentLayout && this._currentLayout.close();
        this._currentLayout = new app.PageLayout();
        this._currentLayout.render();
    },

    user: function() {
        this._currentLayout && this._currentLayout.close();
        this._currentLayout = new app.ProfileLayout();
        this._currentLayout.render();
    },

    fourOhFour: function() {
        console.log("404");
    },
});

app.App.addInitializer(function() {
    app.firebase = new Firebase("https://chordgrids.firebaseio.com");
    app.auth.init();

    var router = new MyRouter();

    // Start the router. Show the 404 page if no route is matched
    if (!Backbone.history.start({ pushState: true }))
        router.navigate('404', { trigger: true, replace: true });

    // Make links work with single-page navigation (https://gist.github.com/tbranyen/1142129)
    if (Backbone.history && Backbone.history._hasPushState) {
        $(document).on("click", "a", function(evt) {
            var href = $(this).attr("href");
            if (!href || href == '#')
                return true;
            
            // If the URL is relative (does not include a protocol), handle it with the router.
            // Otherwise let it go.
            var protocol = this.protocol + "//";
            if (href.slice(0, protocol.length) !== protocol) {
                evt.preventDefault();
                router.navigate(href, true);
                return false;
            }
            return true;
        });
    }
});

app.currentSymbol = 0;
