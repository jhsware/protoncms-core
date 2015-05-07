'use strict';

var createInterface = require('component-registry').createInterface;

/*
    Network ities
*/

module.exports.IDataFetcher = createInterface({
    // ity to fetch data from server
    name: 'IDataFetcher'
    
});

module.exports.IApiCall = createInterface({
    // ity to fetch data from server
    name: 'IApiCall'
    
});

module.exports.IDeserialize = createInterface({
    // ity to convert data to objects
    name: 'IDeserialize'
    
});