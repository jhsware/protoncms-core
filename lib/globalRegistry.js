'use strict';

var AdapterRegistry = require('component-registry').AdapterRegistry;
var UtilityRegistry = require('component-registry').UtilityRegistry;

var registry;

module.exports = (function () {
    /*
    
        Creates both utility and adapter registry, both mounted on global.registry
        You can access these like this:
    
            global.registry.registerAdapter()
            global.registry.registerUtility()
            ...
    
    */
    
    if (typeof registry === 'undefined') {
        console.log('[component-registry] Creating component utility registry @ global.registry');
        registry = new UtilityRegistry();
        
        console.log('[component-registry] Creating component adapter registry @ global.registry');
        var tmp = new AdapterRegistry();
        
        for (var key in tmp) {
            if (tmp.hasOwnProperty(key)) {
                registry[key] = tmp[key];
            }
        }
        for (var key in {registerAdapter: true, getAdapter: true}) {
            registry[key] = tmp[key];
        }
    }
    
    return registry;
})();