'use strict';

var createAdapter = require('component-registry').createAdapter;

var IDatabaseService = require('../../interfaces').IDatabaseService;

var IProtonObjectPersist = require('../../interfaces').IProtonObjectPersist;
var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObjectPersist = createAdapter({
    implements: IProtonObjectPersist,
    adapts: IProtonObject,
    
    persist: function (callback) {
        console.log('Persisting object to MongoDB:');
        console.log(this.context);
        // Pass to backend
        
        var collectionName = this.context._type;
        
        var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        
        var data = JSON.parse(JSON.stringify(this.context));
        
        if (this.context._id) {
            dbUtil.update(collectionName, this.context._id, data, callback);
        } else {
            dbUtil.insert(collectionName, data, callback);
        }
    }
});

global.adapterRegistry.registerAdapter(ProtonObjectPersist)
