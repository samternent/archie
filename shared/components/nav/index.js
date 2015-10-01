var React = require('react');

var LocalLink = React.createFactory(require('../local_link'));

module.exports = React.createClass({
  displayName: 'Nav',


  render: function () {
    return React.DOM.ul({ className: 'nav-list' },
      React.DOM.li(null,
        LocalLink({ route: 'home' },
          React.DOM.span({ className: 'icon--archie' })
        )
      ),
      React.DOM.li(null, LocalLink({ route: 'home' }, 'home')),
      React.DOM.li(null, LocalLink({ route: 'account' }, 'account'))
    );
  }
});
