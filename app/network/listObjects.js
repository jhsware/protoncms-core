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
        
        // If we passed the sessionId with the params it means
        // that this is a server side request and we need to pass
        // the session id manually
        if (typeof params.sessionId === "string") {
            var theHeaders = {
                'x-session-id': params.sessionId
            }
        } else {
            var theHeaders = {};
        };
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/" + objectType;
        
        httpinvoke(apiPath, "GET", {
            outputType: "json",
            converters: {'text json': JSON.parse},
            timeout: 5000,
            headers: theHeaders,
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return console.log(err);
            }; 
            
            
            var objList = body.data.map(function (item) {
                var ObjectPrototype = components[item._type];
                var obj = new ObjectPrototype(item);
                // console.log("Created [" + obj._implements[0].name + "] " + obj._implements[0].interfaceId);
                return obj;
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
