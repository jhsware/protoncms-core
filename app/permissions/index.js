'use strict';

var createObjectPrototype = require('component-registry').createObjectPrototype;

var IPrincipal = require('../interfaces').IPrincipal;
var IPermissions = require('../interfaces').IPermissions;

var Principal = createObjectPrototype({
    implements: [IPrincipal],
    
    constructor: function (principalId) {
        this._principalId = principalId;
    }
});

module.exports.Principal = Principal;


var Permissions = createObjectPrototype({
    implements: [IPermissions],
    
    constructor: function (permissions) {
        // We want to throw an error if no permissions are passed
        this._permissions = {
            owners: [],
            mayView: permissions.mayView,
            mayEdit: permissions.mayEdit,
            mayDelete: permissions.mayDelete
        }
    }
});

module.exports.Permissions = Permissions;
