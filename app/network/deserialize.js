'use strict';
var IObjectPrototypeFactory = require('../interfaces').IObjectPrototypeFactory;

var deserialize = function (item) {
    if (Array.isArray(item)) {
        
        // Item is an array so lets create one and iterate over the input
        var outp = []
        for (var i = 0, imax = item.length; i < imax; i++) {
            outp.push(deserialize(item[i]))
        }
        return outp;
        
    } else if (typeof item === "object" && item.hasOwnProperty('_type')) {
        
        // Ok so we got a proton object. We need to create it with the prototype factory
        var ofu = global.utilityRegistry.getUtility(IObjectPrototypeFactory, item._type);
        return ofu.getObject(item);
        
    } else if (typeof item === "object"){
        
        // We will assume this is a dictionary style object and deserialize it
        // straight up (we can't handle object with functions unless they implement
        // IProtonObject)
        var outp = {};
        for (var key in item) {
            outp[key] = deserialize(item[key]);
        }
        return outp;
        
    } else {
        
        // Ok, it is just an ordinary value, we just return it
        return item;
    }
}

module.exports.deserialize = deserialize;