var React = require('react');

module.exports = React.createClass({
  displayName: 'account',

  render: function () {
    return React.DOM.div({ className: 'contain content' },
      'this is the profile page layout'
      );
  }
});
