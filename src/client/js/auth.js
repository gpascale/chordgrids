var app = window.ChordGrids = (window.ChordGrids || {});

var _userData = null;
var _pageInitialized = false;
var _loginButton = null;

$(document).ready(function() {
    _pageInitialized = true;
    synchronizeAuthState();
    _loginButton = React.renderComponent(
        <app.LoginButton userData={_userData} />,
        $('.navbar-right')[0]
    );
});

function synchronizeAuthState() {
    if (_loginButton)
        _loginButton.setState({ userData: _userData });
}

app.firebase.onAuth(function(authData) {
    _userData = authData;
    if (_pageInitialized)
        synchronizeAuthState();
});

function name(userData) {
    if (userData.facebook)
        return userData.facebook.displayName;
    return "SoAndSo";
}