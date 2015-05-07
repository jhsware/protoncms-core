'use strict';
var createInterface = require('component-registry').createInterface;
    
module.exports.IDataService = createInterface({
    /*
    Unautheticated users access to objects in backend using
    a utility (it has no user). This is used for the public API
    
    Autheticated users use an adapter. This is used for the
    admin api.
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