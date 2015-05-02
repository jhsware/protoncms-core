'use strict';

require('./noData');
require('./createObject');
require('./listObjects');
require('./getObjectById');
require('./login');
require('./logout');
require('./notFound');

var exportAllFrom = function (requiredModule) {
    for (var key in requiredModule) {
        module.exports[key] = requiredModule[key];
    }    
};

exportAllFrom(require('./deserialize'));