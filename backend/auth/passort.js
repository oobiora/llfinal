const passport = require('passport')
const LocalStratagy = require('passport-local').Strategy
const User = require('../models/user.model')

module.exports = function(passport, config){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use( new LocalStratagy(
    {usernameField: 'username',
    passwordField: 'password'
    }, function(username, password, done) {
    User.isValidUserPassword(username, password, done);
    }));
  }
