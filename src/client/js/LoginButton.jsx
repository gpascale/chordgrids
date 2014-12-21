/** @jsx React.DOM */
var ChordGrids = window.ChordGrids = (window.ChordGrids || {});

ChordGrids.LoginButton = React.createClass({

    getDefaultProps: function() {
        return {
            userData: null
        };
    },

    getInitialState: function() {
        return {
            userData: this.props.userData
        };
    },

    render: function() {
        if (!this.state.userData) {
            return (
                <li>
                    <a href="#" onClick={this.handleLogin} className="loginButton">Sign up / Log in</a>
                </li>
            );
        }
        else {
            var name = this.state.userData.facebook.displayName;
            return (
                <li className="dropdown userDropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        {name}
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="#">My Pages</a></li>
                        <li><a href="#">My Profile</a></li>
                        <li><a href="#" onClick={this.handleLogout}>Log Out</a></li>
                    </ul>
                </li>
            );
        }
    },

    handleLogin: function() {
        ChordGrids.firebase.authWithOAuthPopup("facebook", function(error, authData) {
            if (error)
                console.log("Login Failed!", error);
            else
                console.log("Authenticated successfully with payload:", authData);
        }, { scope: "" });
    },

    handleLogout: function() {
        debugger;
        ChordGrids.firebase.unauth();
    }

});