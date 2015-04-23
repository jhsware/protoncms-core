'use strict'

var session = require('express-session');
//var redisUrl = require('redis-url');
//var RedisStore = require('connect-redis')(expressSession);
var logger = require('logfmt');
var MongoStore = require('connect-mongo')(session);

var config = require('../config');

/*
    Sessions handler docs: https://github.com/expressjs/session
*/

module.exports = function Sessions(url, secret) {
    //var client = redisUrl.connect(url);
    // var store = new RedisStore({ client: client });
    var store = new MongoStore({ 
        url: 'mongodb://' + url,
        ttl: config.sessionExpiration,
        touchAfter: config.sessionExpiration - 60, // https://github.com/kcbanner/connect-mongo#lazy-session-update
        // TODO: To support concurrency read this https://github.com/kcbanner/connect-mongo#set-mongodb-to-clean-expired-sessions-default-mode
    });
    var theSession = session({
        secret: secret,
        store: store,
        resave: true,
        saveUninitialized: true
    });

    store.once('connected', function() {
        logger.log({ type: 'info', msg: 'connected', service: 'mongodb' });
    });
    
    store.on('error', function() {
        logger.log({ type: 'error', msg: 'error', service: 'mongodb', err: err.stack || err.message });
    });
    
    store.on('error', function() {
        logger.log({ type: 'error', msg: 'error', service: 'mongodb', err: err.stack || err.message });
    });

    /*
    store.client.on('connect', function() {
    logger.log({ type: 'info', msg: 'connected', service: 'mongodb' });
    });

    store.client.on('error', function(err) {
    logger.log({ type: 'error', msg: 'error', service: 'mongodb', err: err.stack || err.message });
    });

    store.client.on('end', function() {
    logger.log({ type: 'error', msg: 'disconnected', service: 'mongodb' });
    });
    */

    return session;
};
