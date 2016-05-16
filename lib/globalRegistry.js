'use strict';

var AdapterRegistry = require('component-registry').AdapterRegistry;
var UtilityRegistry = require('component-registry').UtilityRegistry;

module.exports = (function () {
    /*
    
        Creates both utility and adapter registry, both mounted on global.registry
        You can access these like this:
    
            global.registry.registerAdapter()
            global.registry.registerUtility()
            ...
    
    */
    
    if (typeof global.registry === 'undefined') {
        console.log('[component-registry] Creating component utility registry');
        global.registry = new UtilityRegistry();
        
        console.log('[component-registry] Creating component adapter registry');
        var tmp = new AdapterRegistry();
        
        for (var key in tmp) {
            if (tmp.hasOwnProperty(key)) {
                global.registry[key] = tmp[key];
            }
        }
        for (var key in {registerAdapter: true, getAdapter: true}) {
            global.registry[key] = tmp[key];
        }
    }
    
    return global.registry;
})();