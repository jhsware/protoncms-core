'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var createUtility = require('component-registry').createUtility;

var IProtonObject = require('../../interfaces').IProtonObject;
var IObjectPrototypeFactory = require('../../interfaces').IObjectPrototypeFactory;
var Permissions = require('../../permissions').Permissions;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    extends: [Permissions],
    
    constructor: function () {
        this._IPermissions.constructor.call(this, {
            // Override default permissions by calling this constructor in 
            // specialized prototypes
            owners: [],
            mayView: ['owner', 'manager'],
            mayEdit: ['owner', 'manager'],
            mayDelete: ['owner', 'manager']
        });
        
        this._type = 'ProtonObject';
        this.title = 'New object...';
    }
});

module.exports = ProtonObject;

var ObjectPrototypeFactory = createUtility({
    implements: IObjectPrototypeFactory,
    name: 'ProtonObject',
    
    getPrototype: function () {
        return ProtonObject;
    },
    
    getObject: function (data) {
        return new ProtonObject(data);
    }
});

global.utilityRegistry.registerUtility(ObjectPrototypeFactory);

// Register views
require('./editObject');
require('./listItem');
require('./dummyData');
