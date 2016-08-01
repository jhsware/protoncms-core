'use strict';

var exportAllFrom = function (requiredModule) {
    for (var key in requiredModule) {
        module.exports[key] = requiredModule[key];
    }    
};

exportAllFrom(require('./components'));
exportAllFrom(require('./messagingServices'));
exportAllFrom(require('./network'));
exportAllFrom(require('./views'));
exportAllFrom(require('./database'));
exportAllFrom(require('./permissions'));
exportAllFrom(require('./workflow'));
exportAllFrom(require('./principals'));
