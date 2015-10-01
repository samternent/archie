var React = require('react/addons');
var Layouts = require('./layouts');

var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var Nav = React.createFactory(require('./components/nav'));

var layouts = {
  account : React.createFactory(Layouts[ 'account' ]),
  profile : React.createFactory(Layouts[ 'profile' ]),
  home    : React.createFactory(Layouts[ 'home' ]),
  login   : React.createFactory(Layouts[ 'login' ])
};

module.exports = React.createClass({
  displayName: 'archie',

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
      this._renderLayout()
    );
  }
});
