'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    
    constructor: function () {    
        this._type = 'ProtonObject';
        this._workflowId = undefined;
        this.title = 'New object...';
    }
});

module.exports = ProtonObject;

// Import views
require('./listItem');
require('./editObject');
require('./dummyData');

if (typeof window !== 'undefined') {
    require('./objectPersistToApi');    
} else {
    require('./objectPersistToMongoDB');
}
