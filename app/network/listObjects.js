'use strict';
var createUtility = require('component-registry').createUtility;

var IDataFetcher = require('../interfaces').IDataFetcher;

var User = require('../components/User');
var ProtonObject = require('../components/ProtonObject');

var FetchDataUtility = createUtility({
    implements: IDataFetcher,
    name: 'listObjects',
    
    fetchData: function (params, callback) {
        
        var content = []
        for (var i = 0, imax = 200; i < imax; i++) {
            if (i % 4 == 0) {
                var tmp = new User({
                    title: "I am User Nr " + i + "!",
                    _type: 'User',
                    _id: "obj_" + i,
                    _workflowId: ''
                });
            } else {
                var tmp = new ProtonObject({
                    title: "I am a Simple Proton Object (" + i + ")",
                    _type: 'ProtonObject',
                    _id: "obj_" + i,
                    _workflowId: ''
                });
            }
            content.push(tmp);
        }
        
        var outp = {
            status: 200,
            body: {
                title: "This is the start page",
                description: 'No description',
                content: content
            }
        };
        callback(undefined, outp);
    }
});
global.utilityRegistry.registerUtility(FetchDataUtility);
