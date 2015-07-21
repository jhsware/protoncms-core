'use strict';

var createInterface = require('component-registry').createInterface;
var Schema = require('isomorphic-schema').Schema;
var validators = require('isomorphic-schema').field_validators;

/*
    Object Prototypes
*/

module.exports.IProtonObject = createInterface({
    // Base Object
    name: 'IProtonObject',
    schema: new Schema("Collection Schema", {
            // Field defs
            title: validators.textField({
                label: 'Title',
                palceholder: 'Type here...',
                help: 'This is the title of your object, used in lists etc.',
                required: true
            }),
    }),
    members: {
        _type: "ro string",        
    }
});

module.exports.IObjectPrototypeFactory = createInterface({
    // Base Object
    name: 'IObjectPrototypeFactory',
    members: {
        getPrototype: "function returns an object prototype",
        getObject: "function (data) returns a new object"
    }
});
    
module.exports.IProtonObjectPersist = createInterface({
    // Manipulate object (in place) so it can be stored
    name: 'IProtonObjectPersist',
    members: {
        prepareForStorage: "function"
    }
});

module.exports.IDummyData = createInterface({
    // store object in backend by using REST API
    name: 'IDummyData',
    members: {
        populate: "function"
    }
});

