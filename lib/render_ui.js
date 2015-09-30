'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sharedApp = require('../shared/app');

var _sharedApp2 = _interopRequireDefault(_sharedApp);

React = require('react');

(function (RenderUI) {
  doc = document;
  el = doc.getElementById('ReactApp');
  React.render((0, _sharedApp2['default'])(), el);
});

module.exports = new RenderUI();
