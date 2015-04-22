'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var ProtonObject = require('../ProtonObject');
var IUser = require('../../interfaces').IUser;

var User = createObjectPrototype({
    implements: [IUser],
    extends: [ProtonObject],
    
    constructor: function () {
        this._type = 'User';
        this.title = 'New User object!';
        this.role = 'editor';
    }
})

module.exports = User;

// Import views
require('./listItem');
require('./editObject');