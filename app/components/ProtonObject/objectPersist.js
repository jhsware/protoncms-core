'use strict';

var createAdapter = require('component-registry').createAdapter;

var httpinvoke = require('httpinvoke');

var IProtonObjectPersist = require('../../interfaces').IProtonObjectPersist;
var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObjectPersist = createAdapter({
    implements: IProtonObjectPersist,
    adapts: IProtonObject,
    
    persist: function (callback) {
        console.log('Persisting object:');
        console.log(this.context);
        // Pass to backend
        
        var apiPath = "/api/" + this.context._type + '/' + this.context._id;
        
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
            if (err) {
                console.error('Server Error:');
            }; 
            return callback(statusCode, body);
        });
        
    }
});

global.adapterRegistry.registerAdapter(ProtonObjectPersist)
