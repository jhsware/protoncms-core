'use strict';

// *****************************************************************
// *** WARNING!!! Deprecated, use protoncms-permissions instead! ***
// *****************************************************************

/*
    this.permissionsUsed("Component.Name", [
        'create',
        'update'
    ]);
    this.user(currentUser).may('update').this(obj);
*/

module.exports = {
    permissionsUsed: function (name, permissions) {
        permissions.forEach(function (permissionName) {
            if (!this._permissionChecks.hasOwnProperty(permissionName)) {
                console.warn("[PERMISSIONS] WARN! The component [" + name + "] uses permission '" + permissionName + "' but it is not registered in (IPermission, '" + this._name + "')");
            }
        }.bind(this))
    },
    
    user: function (user) {
        return {
            may: mayFuncs(this, user)
        }
    }
};

var mayFuncs = function (self, user) {
    return function (permissionName) {
        return {
            this: thisFuncs(self, user, permissionName)
        }
    }
};

var thisFuncs = function (self, user, permissionName) {
    return function (obj) {
        return self._permissionChecks[permissionName](user, obj);
    }
};