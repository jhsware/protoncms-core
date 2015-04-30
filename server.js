'use strict';
var dotenv = require('dotenv').load();

var development = process.env.NODE_ENV !== 'production';

var nodejsx = require('node-jsx').install({
    extension: '.jsx'
});

/*
    Create the global component registry
*/    
if (!global.utilityRegistry) {
    console.log('[App] Creating component utility registry');
    var UtilityRegistry = require('component-registry').UtilityRegistry;
    global.utilityRegistry = new UtilityRegistry();
}
if (!global.adapterRegistry) {
    console.log('[App] Creating component adapter registry');
    var AdapterRegistry = require('component-registry').AdapterRegistry;
    global.adapterRegistry = new AdapterRegistry();
}
/*
    /END COMPONENT REGISTRY/
*/

var cookieParser = require('cookie-parser');
var passport = require('./api/authentication');

var path = require('path');
var url = require('url');
var express = require('express');

var favicon = require('serve-favicon');

var config = require('./config');

var sessionHandling = require('./app/sessions');

var API = require('./api/app');

var renderApp = require('./app/app').renderApp;

var app = express();

// Serve assets locally
app.use('/assets', express.static(path.join(__dirname, 'assets')))

var favIcon = function (req, res) {
    // TODO: Change so this returns the actual favicon.ico
    res.send("favicon stub");
}
// handle favicon
app.get('/favicon.ico', favIcon)
// uncomment after placing your favicon in /assets
//app.use(favicon(__dirname + '/assets/favicon.ico'));

// Session handling
app.use(cookieParser(config.cookieSecret))
app.use(function (req, res, next) {
    // Check if we have passed a forced session id header and in which
    // set req.sessionID so the session is found even when call is made during
    // server side rendering
    // TODO: Get the session ID cookie name from config and also set it in app/sessions.js
    if (req.headers['x-session-id']) {
        req.signedCookies['connect.sid'] = req.headers['x-session-id'];
    }
    return next()
});
app.use(sessionHandling(config.mongoDbHost + '/' + config.mongoDbName, config.cookieSecret))

// Authentication
app.use(passport.initialize());
app.use(passport.session());

// API endpoints
app.use('/api', API);

// Frontend app
app.use(function (req, res, next) {
    renderApp(req, res, next);
})


var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Go to http://localhost:" + PORT + "/ to visit the site!\n");    
});

module.exports = app;
