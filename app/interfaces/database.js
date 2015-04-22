'use strict';
var createInterface = require('component-registry').createInterface;
    
module.exports.IDatabaseService = createInterface({
    // store object in backend by using REST API
    name: 'IProtonObjectPersist',
    members: {
        drop: "function",
        create: "function",
        update: "function",
        fetch: "function",
        delete: "function"
    }
});