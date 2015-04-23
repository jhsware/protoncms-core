'use strict';

var createInterface = require('component-registry').createInterface;

/*
    Network Utilities
*/

module.exports.IDataFetcher = createInterface({
    // Utility to fetch data from server
    name: 'IDataFetcher'
    
});

module.exports.IApiCall = createInterface({
    // Utility to fetch data from server
    name: 'IApiCall'
    
});
