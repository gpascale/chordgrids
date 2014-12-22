var app = window.ChordGrids = (window.ChordGrids || {});

var _userData = null;
var _pageInitialized = false;
var _loginButton = null;

app.Auth = Backbone.Model.extend({
    userData: null,
    init: function() {
        app.firebase.onAuth(function(authData) {
            app.auth.userData = authData;
            app.auth.trigger('authChanged', authData);
        });
    }
});
app.auth = new app.Auth();
