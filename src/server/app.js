require('babel/register');


var React =  require('react');
var express = require('express');
var app = express();

app.use(require('cookie-parser')());


var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

var routes = require('./routes')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
