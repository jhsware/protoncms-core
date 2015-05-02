'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var createUtility = require('component-registry').createUtility;

var IObjectPrototypeFactory = require('../../interfaces').IObjectPrototypeFactory;

var ProtonObject = require('../ProtonObject');
var Principal = require('../../permissions').Principal;
var IUser = require('../../interfaces').IUser;

var User = createObjectPrototype({
    implements: [IUser],
    extends: [Principal, ProtonObject],
    
    constructor: function (params) {
        this._IPrincipal.constructor.call(this, {
            principalId: params.principalId,
            role: params.role
        });
        this._IProtonObject.constructor.call(this); // TODO: Customised permissions?
        
        this._type = 'User';
        this.title = 'New User object!';
        
    }
})

module.exports = User;

var ObjectPrototypeFactory = createUtility({
    implements: IObjectPrototypeFactory,
    name: 'User',
    
    getPrototype: function () {
        return User;
    },
    
    getObject: function (data) {
        return new User(data);
    }
});

global.utilityRegistry.registerUtility(ObjectPrototypeFactory);


// Import views
require('./listItem');
require('./editObject');