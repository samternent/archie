var React = require('react');

var LocalLink = React.createFactory(require('../local_link'));

module.exports = React.createClass({
  displayName: 'Nav',


  render: function () {
    return React.DOM.div({ className: 'pure-menu pure-menu-horizontal archie-menu' },
      LocalLink({ className: 'pure-menu-heading', route: 'home' },
        React.DOM.span({ className: 'icon--archie' }, 'archie.')
      ),
      React.DOM.ul({ className: 'pure-menu-list archie-menu-items' },
        React.DOM.li({ className: 'pure-menu-item archie-menu-item' },
          LocalLink({ className: 'pure-menu-link', route: 'profile' }, 'profile')
        ),
        React.DOM.li({ className: 'pure-menu-item archie-menu-item' },
          LocalLink({ className: 'pure-menu-link', route: 'account' }, 'account')
        )
      )
    );
  }
});
