'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var ProtonObject = require('../ProtonObject');
var Principal = require('../../permissions').Principal;
var IUser = require('../../interfaces').IUser;

var User = createObjectPrototype({
    implements: [IUser],
    extends: [Principal, ProtonObject],
    
    constructor: function () {
        this._IPrincpal.constructor.call(this, {
            principalId: 'user_1', // TODO: Create a proper principal id
            role: 'editor' // default role
        }); 
        this._IProtonObject.constructor.call(this); // TODO: Customised permissions?
        
        this._type = 'User';
        this.title = 'New User object!';
    }
})

module.exports = User;

// Import views
require('./listItem');
require('./editObject');