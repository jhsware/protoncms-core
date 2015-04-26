'use strict';

var exportAllFrom = function (requiredModule) {
    for (var key in requiredModule) {
        module.exports[key] = requiredModule[key];
    }    
};

exportAllFrom(require('./components'));
exportAllFrom(require('./network'));
exportAllFrom(require('./views'));
exportAllFrom(require('./workflow'));
exportAllFrom(require('./database'));
exportAllFrom(require('./permissions'));
