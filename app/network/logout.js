'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IApiCall = require('../interfaces').IApiCall;

var deserialize = require('./deserialize').deserialize;

var ApiCallUtility = createUtility({
    implements: IApiCall,
    name: 'logout',
    
    logout: function (params, callback) {
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/logout";
        
        httpinvoke(apiPath, "GET", {
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
            
            var body = deserialize(body);
            callback(undefined, body, statusCode);
        });
    }
});
global.utilityRegistry.registerUtility(ApiCallUtility);
