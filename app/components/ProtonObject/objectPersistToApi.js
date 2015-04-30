'use strict';
var createAdapter = require('component-registry').createAdapter;

var httpinvoke = require('httpinvoke');

var IProtonObjectPersist = require('../../interfaces').IProtonObjectPersist;
var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObjectPersist = createAdapter({
    implements: IProtonObjectPersist,
    adapts: IProtonObject,
    
    persist: function (callback) {
        console.log('Persisting object to API:');
        console.log(this.context);
        // Pass to backend
        
        var apiPath = "/api/" + this.context._type + '/' + this.context._id;
        
        /*
        var data = {};
        console.log("Persisting to backend:");
        for(var key in this.context){
            // check also if property is not inherited from prototype
            if (this.context.hasOwnProperty(key)) { 
                data[key] = this.context[key];
                console.log(key + ": " + this.context[key]);
            }
        }
        */
        var data = this.context.toJSON();
        
        httpinvoke(apiPath, "POST", {
            headers: {
                'Content-Type': 'application/json'
            },
            input: this.context,
            inputType: "json",
            outputType: "json",
            converters: {
                'json text': JSON.stringify,
                'text json': JSON.parse
            },
            timeout: 5000
        }, function (err, body, statusCode, headers) {
            if (err || statusCode != 200) {
                return callback(err, body);
            }; 
            return callback(undefined, body, statusCode);
        });
        
    }
});

global.adapterRegistry.registerAdapter(ProtonObjectPersist)
