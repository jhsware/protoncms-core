'use strict';

var exportMe = function (name) {
    module.exports[name] = require('./' + name);
}

//exportMe('ProtonObject');
//exportMe('User');
module.exports.ProtonObject = require('./ProtonObject');
module.exports.User = require('./User');