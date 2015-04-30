'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var IProtonObject = require('../../interfaces').IProtonObject;
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

// Import views
require('./editObject');
require('./listItem');
require('./dummyData');

if (typeof window !== 'undefined') {
    require('./objectPersistToApi');    
}
