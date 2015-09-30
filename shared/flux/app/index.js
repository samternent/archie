var Flux = require('tbg-flux-factory');


var app = Flux.createStore({
  name    : 'app',
  data    : {
              route           : 'home',
              logged_in       : false,
              redirect_route  : 'home'
            },
  actions: {
    view  : {
              setRoute: function (route) {
                if (!app.data.logged_in) {
                  app.data.redirect_route = route;
                  route = 'login';
                }
                if (app.data.route !== route) {
                  history.pushState({ route: route }, null, route);
                }
                app.setState({ route: route });
              }
            },
    server: {
              login: function () {
                app.setState({
                  logged_in   : true,
                  route       : app.data.redirect_route || 'home'
                });
              }
    }
  }
});
