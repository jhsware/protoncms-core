'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

var components = require('../components');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'createObject',
    
    fetchData: function (params, callback) {
                
        var ObjectPrototype = components[params.objectType];
        
        // TODO: Figure out how we set the principalId in a smart way
        var obj = new ObjectPrototype({
            principalId: 'user-' + Date.now(),
            role: 'editor'
        });
        
        console.log("Created [" + obj._implements[0].name + "] " + obj._implements[0].interfaceId);
        
        var outp = {
            status: 200,
            body: {
                content: obj
            }
        };
        callback(undefined, outp);
        
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
