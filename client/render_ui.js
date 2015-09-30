var React = require('react');


require('../shared/flux');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var ReactApp = React.createFactory(require('../shared/app'));

window.addEventListener('popstate', function(e) {
  if (e.state) {
    e.preventDefault();
    AppStore.setState({ route: e.state.route });
  }
});

var RenderUI = function () {
  var doc   = document;
  var el    = doc.getElementById('ReactApp');
  var route = el.dataset.appRoute;

  AppStore.setState({ route: route });

  React.render(ReactApp(), el);
}

module.exports = new RenderUI();
