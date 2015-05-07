'use strict';

var createInterface = require('component-registry').createInterface;

/*
    Network ities
*/

module.exports.IDataFetcher = createInterface({
    // Utility to fetch data from API for page rendering
    name: 'IDataFetcher'
    
});

module.exports.IApiCall = createInterface({
    // Utility providing other calls to the API
    name: 'IApiCall'
    
});

module.exports.IDeserialize = createInterface({
    // Utility to convert JSON data to a proper data structure
    // with proper ProtonCMS objects where applicable
    name: 'IDeserialize'
    
});