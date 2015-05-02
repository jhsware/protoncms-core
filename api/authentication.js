'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var IDatabaseService = require('../app/interfaces').IDatabaseService;
var components = require('../app/components');
var rootPrincipal = require('../app/permissions').rootPrincipal;
var Principal = require('../app/permissions').Principal;

console.log("[AUTHENTICATION] Register local strategy");
passport.use(new LocalStrategy(
  function(username, password, done) {
      
      console.log("[AUTHENTICATION] ...finding user...");
      
      var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
      dbUtil.query(rootPrincipal, 'User', { email: username }, function (err, user) {
          if (err) { return done(err); }
          
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          
          if (user.length > 1) {
            return done(null, false, { message: 'Duplicate matches, contact helpdesk!' });
          }
          
          user = user[0];
          
          if (typeof user === "undefined") {
            return done(null, false, { message: "We couldn't find the user :(" });
          }
          
          if (user.birth_year != password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          
          return done(null, user);
      });
      
  }
));

// TODO: In production if we want maximum scalability, we should probably use an in-memory key store such as
// Redis and then read the user from there, but it needs to be synced on updates
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    // TODO: Restrict fields fetched to only those relevant for access control
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    
    dbUtil.fetchById(rootPrincipal, 'User', id, function (err, user) {
        // Create a principal that can be used for permission checks
        if (user) {
            var principal = new Principal(user);
            return done(err, principal);
        } else {
            // Invalidates the existing login session if no user was found.
            // https://github.com/jaredhanson/passport/issues/6
            return done(null, false);
        }
    });
});

module.exports = passport;