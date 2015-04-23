'use strict';

var createInterface = require('component-registry').createInterface;
var Schema = require('isomorphic-schema').Schema;
var validators = require('isomorphic-schema').field_validators;

/*
    Object Prototypes
*/

module.exports = new Schema("Login Form", {
    // Field defs
    email: validators.emailField({
        label: 'E-mail',
        palceholder: 'Type here...',
        help: 'The e-mail connected to your user',
        required: true
    }),
    password: validators.textField({
        label: 'Password',
        palceholder: 'Type here...',
        help: 'The password is case sensitie',
        required: true
    })
});
