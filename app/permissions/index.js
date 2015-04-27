'use strict';

var createObjectPrototype = require('component-registry').createObjectPrototype;

var IPrincipal = require('../interfaces').IPrincipal;
var IRootPrincipal = require('../interfaces').IRootPrincipal;
var IPermissions = require('../interfaces').IPermissions;

var Principal = createObjectPrototype({
    implements: [IPrincipal],
    
    constructor: function (params) {
        this.role = params.role
        this._principalId = params.principalId;
    }
});

module.exports.Principal = Principal;

var RootPrincipal = createObjectPrototype({
    implements: [IPrincipal, IRootPrincipal],
    
    constructor: function () {
        this._principalId = "root";
    }
});

module.exports.rootPrincipal = new RootPrincipal();


var Permissions = createObjectPrototype({
    implements: [IPermissions],
    
    constructor: function (permissions) {
        // We want to throw an error if no permissions are passed
        this._owners = permissions.owners,
        this._permissionsView = permissions.mayView,
        this._permissionsEdit = permissions.mayEdit,
        this._permissionsDelete = permissions.mayDelete
    }
});

module.exports.Permissions = Permissions;
