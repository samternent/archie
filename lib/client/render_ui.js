'use strict';

var React = require('react');

require('../shared/flux');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var Archie = React.createFactory(require('../shared/app'));

window.addEventListener('popstate', function (e) {
  if (e.state) {
    e.preventDefault();
    AppStore.setState({ route: e.state.route });
  }
});

var RenderUI = function RenderUI() {
  var doc = document;
  var el = doc.getElementById('archie');
  var route = el.dataset.appRoute;

  AppStore.setState({ route: route });

  React.render(Archie(), el);
};

module.exports = new RenderUI();