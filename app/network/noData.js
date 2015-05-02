'use strict';
var createUtility = require('component-registry').createUtility;
var httpinvoke = require('httpinvoke');

var IDataFetcher = require('../interfaces').IDataFetcher;

var components = require('../components');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'noData',
    
    fetchData: function (params, callback) {
        
        callback(undefined, {}, 200);
        
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
