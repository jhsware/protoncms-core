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
   
module.exports.IRelationResolverFactory = createInterface({
    // Use this to register a relation resolver utility
    name: 'IRelationResolverFactory',
    members: {
        getResolver: "function returns a relation resolver"
    }
});
 
module.exports.IProtonObjectPersist = createInterface({
    // Manipulate data (in place) so it can be stored
    // This is an adapter to benefit from overriding, but actions
    // are performed on passed data so we don't by mistake get default values
    // when instantiating objects if those properties aren't passed to the API for persisting.
    // This could happen for subforms or forms with limited set of shown fields.
    name: 'IProtonObjectPersist',
    members: {
        prepareForStorage: "function (data)",
        cleanForApi: "function (data)",
    }
});

module.exports.IDummyData = createInterface({
    // store object in backend by using REST API
    name: 'IDummyData',
    members: {
        populate: "function"
    }
});

module.exports.IFieldDummyData = createInterface({
    name: 'IFieldDummyData',
    
    mempers: {
        generate: "function"
    }
});

