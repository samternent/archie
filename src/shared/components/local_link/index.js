var React = require('react');

var Flux = require('tbg-flux-factory');
var app  = Flux.getStore('app');

module.exports = React.createClass({
  displayName: 'LocalLink',

  _handleClick: function (e) {
    e.preventDefault();

    app.Actions.setRoute(this.props.route);
  },

  render: function () {
    return React.DOM.a({
        className : this.props.className,
        href      : this.props.route,
        onClick   : this._handleClick
      }, this.props.children );
  }
});
