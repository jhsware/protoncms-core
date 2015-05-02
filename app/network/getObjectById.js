'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

var deserialize = require('./deserialize').deserialize;

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'fetchObjectById',
    
    fetchData: function (params, callback) {
        
        if (typeof Window === 'undefined') {
            var host = 'http://127.0.0.1:5000';
        } else {
            var host = '';
        }
        var apiPath = host + "/api/" + params.parentId + '/' + params.objectId;
        
        httpinvoke(apiPath, "GET", {
            outputType: "json",
            converters: {'text json': JSON.parse},
            timeout: 5000
        }, function (err, body, statusCode, headers) {
            if (err) {
                console.error('Server Error:');
                return callback(err);
            };

            if (statusCode != 200) {
                console.error('Server Error:');
                return callback(undefined, body, statusCode);
            };

            var body = deserialize(body);
            callback(undefined, body);
        });
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
