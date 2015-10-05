'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'account',

  render: function render() {
    return React.DOM.div({ className: 'contain content' }, 'this is the account page layout');
  }
});