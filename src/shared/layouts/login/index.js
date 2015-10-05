var React = require('react');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

module.exports = React.createClass({
  displayName: 'login',

  render: function () {
    return React.DOM.div({ className: 'contain content' },
      React.DOM.form({ className: 'pure-form', action: "/login", method: "post" },
        React.DOM.div(null,
          React.DOM.input({ placeholder: 'email', type: 'text', name: 'username' })
        ),
        React.DOM.div(null,
          React.DOM.input({ placeholder: 'password', type: 'password', name: 'password' })
        ),
        React.DOM.input({ className: 'pure-button pure-button-primary', type: 'submit', value: 'login' })
      )
    );
  }
});
