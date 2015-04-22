'use strict';
var dotenv = require('dotenv').load();

var development = process.env.NODE_ENV !== 'production';

var path = require('path');
var url = require('url');
var express = require('express');
var nodejsx = require('node-jsx').install({
    extension: '.jsx'
});
var favicon = require('serve-favicon');

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
