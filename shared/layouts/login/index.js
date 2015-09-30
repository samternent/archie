var React = require('react');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

module.exports = React.createClass({
  displayName: 'login',

  _handleLoginClick: function (e) {
    e.preventDefault();
    AppStore.Actions.login();
  },

  render: function () {
    return React.DOM.div(null,
      React.DOM.form({ action: "/login", method: "post" },
        React.DOM.div(null,
          React.DOM.label(null, 'Email'),
          React.DOM.input({ type: 'text', name: 'username' })
        ),
        React.DOM.div(null,
          React.DOM.label(null, 'password'),
          React.DOM.input({ type: 'password', name: 'password' })
        ),
        React.DOM.input({ type: 'submit', value: 'login', onClick: this._handleLoginClick })
      )
    );
  }
});
