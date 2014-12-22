var app = window.ChordGrids = (window.ChordGrids || {});

app.HeaderView = Marionette.ItemView.extend({
    template: app.Templates.HeaderView,
    el: '.navbar',

    initialize: function() {
        for (var i = 0; i < app.Symbol.Count; ++i) {
            var svg = app.common.makeSVG('svg');
            svg.appendChild(app.common.createSymbol(i, [10, 10], 8));
            svg.setAttribute('width', '20px');
            svg.setAttribute('height', '20px');
            var content = $('<div/>')
                    .addClass('symbolDropdownEntry')
                    .append(svg)
                    .append($('<span> (' + i + ') </span>'));
            this.$('.symbolDropdown .dropdown-menu').append($('<li/>').append($('<a href="#"/>').append(content)));
        }

        this.$('.nav .dropdown-menu li a').on('click', function(e) {
            var idx = $(this).parent().index();
            var svg = app.common.makeSVG('svg');
            svg.appendChild(app.common.createSymbol(idx, [10, 10], 8));
            svg.setAttribute('width', '20px');
            svg.setAttribute('height', '20px');
            $('.nav .dropdown-toggle .svgContainer').html(svg);
            app.currentSymbol = idx;
            console.log('current symbol: ' + app.currentSymbol);
        })

        this.$($('.nav .dropdown-menu').children()[0]).find('a').trigger('click');
    },

    onRender: function() {
        var loginButton = React.renderComponent(
            <app.LoginButton userData={app.auth.userData}/>,
            this.$('.navbar-right')[0]
        );
        app.auth.on('authChanged', function(userData) {
            loginButton.setState({ userData: userData });
        });
    }
});
