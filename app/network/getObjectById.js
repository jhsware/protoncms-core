'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

var ProtonObject = require('../components/ProtonObject');
var User = require('../components/User');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'getObjectById',
    
    fetchData: function (params, callback) {
        
        var idVal = parseInt(params.objectId.replace("obj_",""));
        
        if (idVal % 2 == 0) {
            var objectType = 'ProtonObject';            
        } else {
            var objectType = 'User';
        }
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/" + objectType + '/' + params.objectId;
        
        httpinvoke(apiPath, "GET", {
            outputType: "json",
            converters: {'text json': JSON.parse},
            timeout: 5000
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return console.log(err);
            }; 
            
            var ObjectPrototype = require('../components/' + objectType);
            
            var obj = new ObjectPrototype(body);
            
            var outp = {
                status: 200,
                body: obj
            };
            callback(undefined, outp);
        });
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
