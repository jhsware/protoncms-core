'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

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
        
        callback(undefined, {
            data: obj
        }, 200);
        
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
