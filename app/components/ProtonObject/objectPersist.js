'use strict';

var createAdapter = require('component-registry').createAdapter;

var httpinvoke = require('httpinvoke');

var IProtonObjectPersist = require('../../interfaces').IProtonObjectPersist;
var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObjectPersist = createAdapter({
    implements: IProtonObjectPersist,
    adapts: IProtonObject,
    
    persist: function () {
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
            converters: {'json text': JSON.stringify},
            timeout: 5000
        }, function (err) {
            if (err) {
                console.error('Server Error:');
                return console.log(err);
            }; 
            
            console.log('Update done!');
        });
        
    }
});

global.adapterRegistry.registerAdapter(ProtonObjectPersist)
