'use strict';
var createUtility = require('component-registry').createUtility;

var IObjectPrototypeFactory = require('../interfaces').IObjectPrototypeFactory;
var IDeserialize = require('../interfaces').IDeserialize;


var DeserializeUtility = createUtility({
    implements: IDeserialize,
    
    deserialize: function (item) {
        if (Array.isArray(item)) {
        
            // Item is an array so lets create one and iterate over the input
            var outp = []
            for (var i = 0, imax = item.length; i < imax; i++) {
                outp.push(this.deserialize(item[i]))
            }
            return outp;
        
        } else if (item && typeof item === "object" && item.hasOwnProperty('_type')) {
            //      ^ handle null which returns "object"
            // Ok so we got a proton object. We need to create it with the prototype factory
            var ofu = global.registry.getUtility(IObjectPrototypeFactory, item._type);
            return ofu.getObject(item);
        
        } else if (item && typeof item === "object"){
            //      ^ handle null which returns "object"
            // We will assume this is a dictionary style object and deserialize it
            // straight up (we can't handle object with functions unless they implement
            // IProtonObject)
            var outp = {};
            for (var key in item) {
                outp[key] = this.deserialize(item[key]);
            }
            return outp;
        
        } else {
        
            // Ok, it is just an ordinary value, we just return it
            return item;
        }
    }
});

module.exports = DeserializeUtility;