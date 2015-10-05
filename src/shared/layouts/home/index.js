var React = require('react');

module.exports = React.createClass({
  displayName: 'home',
  render: function () {
    return React.DOM.div({ className: 'contain content' },
      'Just a simple test of routing and VERY basic recording'
      );
  }
});
