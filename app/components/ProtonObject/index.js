'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    
    constructor: function () {    
        this._type = 'ProtonObject';
        this._parentId = undefined;
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
} else {
    require('./objectPersistToMongoDB');
}
