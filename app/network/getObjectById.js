'use strict';
var createUtility = require('component-registry').createUtility;

var IDataFetcher = require('../interfaces').IDataFetcher;

var ProtonObject = require('../components/ProtonObject');
var User = require('../components/User');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'getObjectById',
    
    fetchData: function (params, callback) {
        
        var idVal = parseInt(params.objectId.replace("obj_",""));
        
        if (idVal % 2 == 0) {
            var obj = new ProtonObject({
                title: "I am a Simple Proton Object",
                _id: params.objectId,
                _workflowId: 'xxx'
            });            
        } else {
            var obj = new User({
                title: "I am a User",
                role: undefined,
                description: undefined,
                _id: params.objectId,
                _workflowId: 'xxx'
            });
        }
        
        var outp = {
            status: 200,
            body: obj
        };
        callback(undefined, outp);
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
