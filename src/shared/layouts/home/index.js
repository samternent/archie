var React = require('react');

module.exports = React.createClass({
  displayName: 'home',
  render: function () {
    return React.DOM.div({ className: 'contain content' },
        React.DOM.h1(null, 'Archie Home Page'),
        React.DOM.p(null, 'this is the home page of my archiio framework')
      );
  }
});
