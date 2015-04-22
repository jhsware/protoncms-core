'use strict';
var createUtility = require('component-registry').createUtility;

var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;
var IDatabaseService = require('../interfaces').IDatabaseService;

var components = require('../components');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'listObjects',
    
    fetchData: function (params, callback) {
        
        var objectType = params.objectType || 'User';
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/" + objectType;
        
        httpinvoke(apiPath, "GET", {
            outputType: "json",
            converters: {'text json': JSON.parse},
            timeout: 5000
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return console.log(err);
            }; 
            
            var ObjectPrototype = components[objectType];
            
            var objList = body.data.map(function (item) {
                return new ObjectPrototype(item);
            })
            
            var outp = {
                status: 200,
                body: {
                    content: objList
                }
            };
            callback(undefined, outp);
        });
        
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
