'use strict';

var React = require('react');

var Flux = require('tbg-flux-factory');
var app = Flux.getStore('app');

module.exports = React.createClass({
  displayName: 'LocalLink',

  _handleClick: function _handleClick(e) {
    e.preventDefault();

    app.Actions.setRoute(this.props.route);
  },

  render: function render() {
    return React.DOM.a({
      className: this.props.className,
      href: this.props.route,
      onClick: this._handleClick
    }, this.props.children);
  }
});