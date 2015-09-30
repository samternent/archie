require('coffee-script').register();


var React     = require('react/addons');

require('../../shared/flux');
var Flux = require('tbg-flux-factory');
var AppStore = Flux.getStore('app');

var passport = require('passport');

var ReactApp  = React.createFactory(require('../../shared/app.js'));
var fs = require('fs');
var AWS = require('aws-sdk');
var zlib = require('zlib');


var myReactRoute = function (res, route) {
  AppStore.setState({ route: route });
  var reactApp = React.renderToString( ReactApp() );

  res.render('index.ejs', {
      ReactApp  : reactApp,
      Route     : route || 'home'
    });
};





module.exports = function (app) {

  // Main app route
  require('./auth')(app);

  app.get('/', function (req, res) {
    myReactRoute(res, 'home');
  });
  app.get('/home',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    myReactRoute(res, 'home');
  });
  app.get('/account',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    myReactRoute(res, 'account');
  });
  app.get('/record',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    myReactRoute(res, 'record');
  });
  app.get('/login', function (req, res) {
    myReactRoute(res, 'login');
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });


  app.post('/api/video', function (req, res) {
    var buf = new Buffer(req.body.blob, 'base64'); // decode

    var S3_KEY = 'AKIAJXDOTPJHXQNEUDHA';
    var S3_SECRET = '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';
    var S3_BUCKET = 'the-album';
    var S3_REGION = 'eu-west-1';

    var body = fs.createReadStream(buf).pipe(zlib.createGzip());
    var s3obj = new AWS.S3({params: {Bucket: S3_BUCKET, Key: S3_KEY, Region: S3_REGION, Secret: S3_SECRET }});
    s3obj.upload({Body: body}).
      on('httpUploadProgress', function(evt) { console.log(evt); }).
      send(function(err, data) { console.log(err, data) });
      // fs.writeFile("public/test1.webm", buf, function(err) {
      //   if(err) {
      //     console.log("err", err);
      //   } else {
      //     return res.json({'status': 'success'});
      //   }
      // })
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

  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('profile', { user: req.user });
    });

  app.get('/script.js', function (req, res) {
    res.sendfile("./dist/script.js");
  });
  app.get('/style.css', function (req, res) {
    res.sendfile("./dist/style.css");
  });
};
