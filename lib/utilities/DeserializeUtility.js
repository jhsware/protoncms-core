'use strict';
var registry = require('../globalRegistry');
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
        
        } else if (item && item !== null && typeof item === "object") {
            // We traverse the object in case it contains objects further down
            // the hierarchy
            var outp = {};
            for (var key in item) {
                outp[key] = this.deserialize(item[key]);
            }
            
            if (item.hasOwnProperty('_type')) {
                // Ok so it looks like we got a proton object. We need to create it with the prototype factory
                var ofu = registry.getUtility(IObjectPrototypeFactory, item._type, undefined);
                if (ofu !== undefined) {
                    return ofu.getObject(outp);
                } else {
                    console.warn("[DeserializeUtility] IObjectPrototypeFactory for '" + item._type + "' was not found, returning as plain object");
                    return outp;
                }
                                
            }
            
            // It wasn't a ProtonObject so we are just returning it as is
            return outp;
        
        } else {
            // Ok, it is just an ordinary value, we just return it
            return item;
        }
    }
});

module.exports = DeserializeUtility;