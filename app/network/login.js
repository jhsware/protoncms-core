'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IApiCall = require('../interfaces').IApiCall;

var components = require('../components');

var ApiCallUtility = createUtility({
    implements: IApiCall,
    name: 'login',
    
    login: function (params, callback) {
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/login";
        
        httpinvoke(apiPath, "POST", {
            headers: {
                'Content-Type': 'application/json'
            },
            input: params,
            inputType: "json",
            outputType: "json",
            converters: {
                'json text': JSON.stringify,
                'text json': JSON.parse
            },
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return callback(err);
            };
            
            console.log("Result from API");
            console.log(body);
            
            var outp = {
                body: body
            };
            callback(undefined, outp, statusCode);
        });
    }
});
global.utilityRegistry.registerUtility(ApiCallUtility);
