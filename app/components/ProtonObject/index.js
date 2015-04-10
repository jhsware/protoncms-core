'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;

var IProtonObject = require('../../interfaces').IProtonObject;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    _id: undefined,
    _type: 'ProtonObject',
    _workflowId: undefined,
    _createdAt: undefined,
    _modifiedAt: undefined,
    
    title: undefined
});

module.exports = ProtonObject;

// Import views
require('./listItem');
require('./editObject');

