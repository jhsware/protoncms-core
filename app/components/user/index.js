'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var ProtonObject = require('../ProtonObject');
var IUser = require('../../interfaces').IUser;

var User = createObjectPrototype({
    implements: [IUser],
    extends: [ProtonObject],

    _type: 'User',
    
    title: 'I am a user!',
    role: 'editor'
})

module.exports = User;

// Import views
require('./listItem');
require('./editObject');