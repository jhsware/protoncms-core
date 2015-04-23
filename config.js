'use strict';

module.exports = {

    // MongoDB
    mongoDbHost: '127.0.0.1:27017',
    mongoDbName: 'protoncms',
    
    // Session handling
    cookieSecret: process.env.COOKIE_SECRET || 'myCookieSecret',
    sessionExpiration: 30 * 60 * 60, // Exporation in seconds
};