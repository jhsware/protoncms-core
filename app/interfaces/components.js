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
        _parentId: "ro string",
        _createdAt: "ro datetime",
        _modifiedAt: "ro datetime",
        _objectType: "ro string",
        // TODO: Add these:
        _owners: "rw string",
        _createdBy: "ro string",
        _modifiedBy: "ro string",
        
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
            email: validators.emailField({
                label: 'E-mail',
                palceholder: 'Type here...',
                help: 'This is your e-mail, used for login and recovering passwords',
                required: true
            }),
            role: validators.selectField({
                label: 'Role',
                palceholder: 'Enter role here...',
                help: 'This is the role of your user, used to define privileges.',
                required: true,
                valueType: validators.textField(),
                options: [
                    {name: "manager", title: "Superadmin"},
                    {name: "editor", title: "Redaktör"},
                    {name: "writer", title: "Skribent"}
                ]
            }),
            description: validators.textAreaField({
                label: 'Description',
                palceholder: 'Enter description here...',
                help: 'This describes this user, maybe a fun pun.',
                required: true
            }),
            birth_year: validators.integerField({
                min: 1895,
                max: 2200,
                label: 'Year of Birth',
                palceholder: 'Enter a year ie. 1975...',
                help: 'This is the year of birth... duh...',
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

module.exports.IDummyData = createInterface({
    // store object in backend by using REST API
    name: 'IDummyData',
    members: {
        populate: "function"
    }
});

