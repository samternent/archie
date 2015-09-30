var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../../db');


module.exports = function (app) {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
    passport.use('local', new Strategy({
       usernameField : 'username',
       passwordField : 'password',
       passReqToCallback : true
   },
   function(req, username, password, done) {
     db.findByUsername(username, function(err, user) {
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
       if (user.password != password) { return done(null, false); }
       return done(null, user);
     });
   }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });







  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());


};
