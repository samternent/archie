var React = require('react');

var LocalLink = React.createFactory(require('../local_link'));

module.exports = React.createClass({
  displayName: 'Nav',


  render: function () {
    return React.DOM.div({ className: 'archie-menu' },
      React.DOM.div({ className: 'contain' },
        React.DOM.div({ className: 'archie__logo' },
          LocalLink({ className: '', route: 'home' },
            React.DOM.i({ className: 'fa fa-heart red archie__logo__icon' }),
            React.DOM.span({ className: 'archie__logo__text' }, 'archie.')
          )
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
