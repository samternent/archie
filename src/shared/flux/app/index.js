var Flux = require('tbg-flux-factory');


var app = Flux.createStore({
  name    : 'app',
  data    : {
              route           : 'home',
              logged_in       : false
            },
  actions: {
    view  : {
              setRoute: function (route) {
                if (app.data.route !== route) {
                  history.pushState({ route: route }, null, route);
                }
                app.setState({ route: route });
              }
            },
    server: {}
  }
});
