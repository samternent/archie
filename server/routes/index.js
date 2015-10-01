require('coffee-script').register();


var React     = require('react/addons');

require('../../shared/flux');
var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var passport = require('passport');

var Archie  = React.createFactory(require('../../shared/app.js'));
var fs = require('fs');
var AWS = require('aws-sdk');
var zlib = require('zlib');


var myReactRoute = function (res, route) {
  AppStore.setState({ route: route });
  var archie = React.renderToString( Archie() );

  res.render('index.ejs', {
      archie   : archie,
      route    : route || 'home'
    });
};





module.exports = function (app) {

  // Main app route
  require('./auth')(app);

  app.get('/',
  function (req, res) {
    myReactRoute(res, 'home');
  });
  app.get('/home',
  function (req, res) {
    myReactRoute(res, 'home');
  });
  app.get('/account',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    myReactRoute(res, 'account');
  });

  app.get('/login', function (req, res) {
    myReactRoute(res, 'login');
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });



  app.get('/api/video/:id', function (req, res) {
    var id = req.params.id
    res.sendfile("./public/" + id + ".webm");
  });

  app.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/');
    });

  // put these in public
  app.get('/script.js', function (req, res) {
    res.sendfile("./dist/script.js");
  });
  app.get('/style.css', function (req, res) {
    res.sendfile("./dist/style.css");
  });
  app.get('/archie.svg', function (req, res) {
    res.sendfile("./public/archie.svg");
  });
};
