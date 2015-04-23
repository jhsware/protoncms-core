'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

var components = require('../components');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'fetchObjectById',
    
    fetchData: function (params, callback) {
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/" + params.workflowId + '/' + params.objectId;
        
        httpinvoke(apiPath, "GET", {
            outputType: "json",
            converters: {'text json': JSON.parse},
            timeout: 5000
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return callback(err);
            };
            
            var ObjectPrototype = components[body.data.objectType];
            
            var obj = new ObjectPrototype(body.data.data);
            
            console.log("This object was returned by API");
            console.log(obj);
            
            var outp = {
                status: 200,
                body: {
                    content: obj
                }
            };
            callback(undefined, outp);
        });
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
