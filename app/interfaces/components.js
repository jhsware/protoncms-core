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
        _id: "ro string",
        _workflowId: "ro string",
        _createdAt: "ro datetime",
        _modifiedAt: "ro datetime",
        _objectType: "ro string"
    }
});

module.exports.IUser = createInterface({
    // User object, inherit from IProtonObject
    name: 'IUser',
    schema: new Schema("Collection Schema", {
            // Field defs
            title: validators.textField({
                label: 'Title',
                palceholder: 'Type here...',
                help: 'This is the title of your object, used in lists etc.',
                required: true
            }),
            role: validators.textField({
                label: 'Role',
                palceholder: 'Enter role here...',
                help: 'This is the role of your user, used to define privileges.',
                required: true
            }),
            description: validators.textField({
                label: 'Description',
                palceholder: 'Enter description here...',
                help: 'This describes this user, maybe a fun pun.',
                required: true
            }),

    }),
    
});

    
module.exports.IProtonObjectPersist = createInterface({
    // store object in backend by using REST API
    name: 'IProtonObjectPersist',
    members: {
        persist: "function"
    }
});

