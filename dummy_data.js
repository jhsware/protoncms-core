'use strict';
var dotenv = require('dotenv').load();

var development = process.env.NODE_ENV !== 'production';

var nodejsx = require('node-jsx').install({
    extension: '.jsx'
});

/*
    Create the global component registry
*/    
if (!global.utilityRegistry) {
    console.log('[App] Creating component utility registry');
    var UtilityRegistry = require('component-registry').UtilityRegistry;
    global.utilityRegistry = new UtilityRegistry();
}
if (!global.adapterRegistry) {
    console.log('[App] Creating component adapter registry');
    var AdapterRegistry = require('component-registry').AdapterRegistry;
    global.adapterRegistry = new AdapterRegistry();
    
    // Register all our input field widgets
    // Change this to override
    require('schema-react-formlib').registerAllWidgets({
        adapterRegistry: global.adapterRegistry,
        utilityRegistry: global.utilityRegistry
    });
}
/*
    /END COMPONENT REGISTRY/
*/

// Register database services
require('./api/database/mongodb')(global);

// Register field dummy data adapters
require('schema-dummy-data').registerAllAdapters({
    adapterRegistry: global.adapterRegistry,
    utilityRegistry: global.utilityRegistry
});

var IDatabaseService = require('./app/interfaces').IDatabaseService;
var IDummyData = require('./app/interfaces').IDummyData;
var components = require('./app/components');
var rootPrincipal = require('./app/permissions').rootPrincipal;
var Principal = require('./app/permissions').Principal;

var createDummyObjects = function (objectType, nrofObjects) {
    
    
    
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    dbUtil.drop(rootPrincipal, objectType, function () {
        for (var i = 0; i < nrofObjects; i++ ) {
            var ObjectPrototype = components[objectType];
            
            var obj = new ObjectPrototype();
            var dda = global.adapterRegistry.getAdapter(obj, IDummyData);
            dda.populate();
        
            // Submitted object passed validation so let's persist it to the backend
            
            var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');

            var principal = new Principal({_principalId: 'dummy_data'});
            var collectionName = obj._type;
            dbUtil.insert(principal, collectionName, obj, function (err, obj) {
                console.log((i + 1) + ': Created [' + objectType + ']: ' + obj.title);
            });
        
        };
    });
};


createDummyObjects('User', 20);