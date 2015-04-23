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
        
        var obj = new ObjectPrototype();
        
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
