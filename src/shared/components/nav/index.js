var React = require('react');

var LocalLink = React.createFactory(require('../local_link'));

module.exports = React.createClass({
  displayName: 'Nav',


  render: function () {
    return React.DOM.div({ className: 'archie-menu' },
      React.DOM.div({ className: 'contain' },
        React.DOM.div({ className: 'archie__logo' },
          LocalLink({ className: '', route: 'home' }, 'archie.')
        ),
        React.DOM.ul({ className: 'archie-menu-items' },
          React.DOM.li({ className: 'archie-menu-item' },
            LocalLink({ className: '', route: 'profile' }, 'profile')
          ),
          React.DOM.li({ className: 'archie-menu-item' },
            LocalLink({ className: '', route: 'account' }, 'account')
          )
        )
      )
    );
  }
});
