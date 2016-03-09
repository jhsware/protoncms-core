'use strict';
var createInterface = require('component-registry').createInterface;
    
module.exports.IDataService = createInterface({
    /*
    This utility is used to persist data to a data store. If the data is passed
    to an API that doesn't map to this set of members, you should create a new
    interface or implement it directly in the API.
    */
    
    name: 'IDataService',
    members: {
        clear: "function",
        create: "function",
        update: "function",
        query: "function",
        delete: "function"
    }
});

module.exports.IImageService = createInterface({
    name: 'IImageService',
    members: {
        urlMatchesService: "function (src) -- returns true or false",
        generateUrl: "function (src, size, gravity) -- returns url"
    }
})