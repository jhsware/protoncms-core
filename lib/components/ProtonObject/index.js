'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var createUtility = require('component-registry').createUtility;

var IProtonObject = require('../../interfaces').IProtonObject;
var IObjectPrototypeFactory = require('../../interfaces').IObjectPrototypeFactory;
var IProtonObjectPersist =  require('../../interfaces').IProtonObjectPersist;

var ProtonObject = createObjectPrototype({
    implements: [IProtonObject],
    extends: [],
    
    constructor: function () {
        this._type = 'ProtonObject';
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

// Only register this on the server
if (typeof window === 'undefined') {
    require('./dummyData');
    
    var ProtonObjectPersist = createAdapter({
        implements: IProtonObjectPersist,
        adapts: IProtonObject,
    
        prepareForStorage: function () {
            // Do nothing...
            return;
        }
    });

    require('../../globalRegistry').registerAdapter(ProtonObjectPersist);
}
