var React = require('react/addons');
var Layouts = require('./layouts');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var Nav = React.createFactory(require('./components/nav'));

var layouts = {
  account : React.createFactory(Layouts[ 'account' ]),
  home    : React.createFactory(Layouts[ 'home' ]),
  login   : React.createFactory(Layouts[ 'login' ]),
  record  : React.createFactory(Layouts[ 'record' ])
};

var ReactCSSTransitionGroup = React.createFactory(React.addons.CSSTransitionGroup);

module.exports = React.createClass({
  displayName: 'app',

  getInitialState: function () {
    return AppStore.getState();
  },

  componentDidMount: function () {
    var that = this;
    AppStore.addChangeListener(function () {
      that.setState(AppStore.getState());
    });
  },

  _renderLayout: function () {
    return layouts[ this.state.route ]({ key: this.state.route });
  },

  render: function () {

    return React.DOM.div(null,
      Nav(),
      ReactCSSTransitionGroup({ transitionName: 'transition__layout' },
        this._renderLayout()
      )
    );
  }
});
