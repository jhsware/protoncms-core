'use strict';
var createInterface = require('component-registry').createInterface;
    
/*

    This should be implemented so it can be used in this way

    if (ip.user(currentUser).may('view').this(obj)) {
        // Then do stuff
    }
    

*/
    
module.exports.IPermissions = createInterface({
    /*
    This named utility is used to check permissions.
    */
    
    name: 'IPermissions',
    members: {
        permissionsUsed: "function (name, permissions) -- use this to check that the permissions you use for this instance exists",
        user: "function (currentUser) -- returns a permission lookup object function (permissionName) that looks up the permission function (obj) and allows you to optionally apply that on your content object"
    }
});