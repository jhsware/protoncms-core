'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var createUtility = require('component-registry').createUtility;

var IProtonObject = require('../../interfaces').IProtonObject;
var IObjectPrototypeFactory = require('../../interfaces').IObjectPrototypeFactory;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    extends: [],
    
    constructor: function () {
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

require('../../globalRegistry').registerUtility(ObjectPrototypeFactory);

// Register views
require('./editObject');
require('./listItem');

// Only register this on the server
if (typeof window !== 'undefined') {
    require('./dummyData');
}
