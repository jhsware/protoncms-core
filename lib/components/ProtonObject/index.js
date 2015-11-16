'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var createUtility = require('component-registry').createUtility;
var createAdapter = require('component-registry').createAdapter;

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
    
        prepareForStorage: function (data) {
            // Do nothing...
            return;
        },
        
        cleanForApi: function (data) {
            /* 
                NOTE! We only perform a shallow merge with existing object when storing data
                so you can only manipulate root level properties without loosing data on an
                update
            */
            
            // Do nothing...
            return;
        }
    });

    require('../../globalRegistry').registerAdapter(ProtonObjectPersist);
}
