'use strict';
var exportAllFrom = function (requiredModule) {
    for (var key in requiredModule) {
        module.exports[key] = requiredModule[key];
    }    
};

exportAllFrom(require('./utils'));

require('../globalRegistry').registerUtility(require('./DeserializeUtility'));