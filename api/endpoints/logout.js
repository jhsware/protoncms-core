'use strict';
var statusCodes = require('./statusCodes');

var passport = require('../authentication');

var login = function(req, res, next) {
    console.log("[LOGIN] Performing logout...");
    try {
        req.logout();
        return res.status(statusCodes.RequestOk).json({
            currentUser: undefined,
            logout: true
        });        
    } catch (e) {
        return res.status(statusCodes.SystemError).json({
            currentUser: undefined,
            logout: true
        });
    }
};

module.exports = login;
