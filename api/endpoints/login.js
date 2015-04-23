'use strict';
var statusCodes = require('./statusCodes');

var passport = require('../authentication');

var login = function(req, res, next) {
    console.log("[LOGIN] Performing authentication...");
    passport.authenticate('local', function(err, user, info) {
        /*
            This is the login handler
            http://passportjs.org/guide/authenticate/

        */
        console.log("[LOGIN] ...we have a result!");
        if (err) { 
            // There was a general error
            return res.status(statusCodes.SystemError).json({
                status: 'error',
                message: 'Something went bananas!'
            });
        }
    
        if (!user) { 
            // We couldn't find the user
            return res.status(statusCodes.AuthenticationError).json({
                status: 'error',
                message: 'We could not validate the user credentials!'
            });
        }
    
        req.login(user, function(err) {
            if (err) { 
                // There was a general error
                return res.status(statusCodes.SystemError).json({
                    status: 'error',
                    message: 'Something went bananas!'
                });
            }
        
            // Whis means success, TODO: We should filter what data we return here!
            return res.status(statusCodes.RequestOk).json({
                objectType: user._type,
                data: user
            });
        });
    })(req, res, next); // Don't forget to call the authenticator!!!
};

module.exports = login;
