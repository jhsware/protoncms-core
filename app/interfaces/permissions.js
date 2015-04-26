'use strict';

var createInterface = require('component-registry').createInterface;

/*
    A user in the system must implement IPrincipal to get the _principalId 
    that is used to determine ownership and creation etc.

    So whenever we get the IDatabaseService we first try to get an adapter and 
    then a utility, the latter used for anonymous users, the prior for logged
    in users.
*/

module.exports.IPrincipal = createInterface({
    name: "IPrincipal",
    members: {
        _principalId: "string"
    }
});

module.exports.IPermissions = createInterface({
    name: "IPermissions",
    /*
    Permission definitions
    
    NOTE: Owners are referenced by princpalId, not objectId
    
    'protoncms.manager' -- this role may to this regardless of workflow state
    'draft:protoncms.manager' -- this role may to this regardless of workflow name as long as state is draft
    'work.draft:protoncms.manager' -- this role may to this on workflow named "work" as long as state is draft
    'draft:owner' -- same as above but applies to user marked as owner, supports all three levels above
    
    */
    members: {
        _permissions: {
            owners: "list of owners",
            mayView: "list of permission definitions for viewing",
            mayEdit: "list of permission definitions for editing",
            mayDelete: "list of permission definitions for deleting"
        }
        
    }
});


module.exports.IPermissionsAdapter = createInterface({
    name: "IPermissionsAdapter",
    /*
    Adapter used to calculate permissions on objects in a workflow. This is in turn
    indexed by a workflow permission catalog.

    The default permissions are that a manager can see and edit anything, and
    an editor can only see and edit content they own.
    
    
    (Implementation detail: catalog these methods with set indexes: may_view(), owners())
    */
    members: {
        userMayEdit: "function (userPermissions, workflow_name)",
        // returns true if the user may edit this object
            
        userMayView: "function (userPermisssions, workflow_name)",
        // returns true if the user may view this object
            
        userMayDelete: "function (userPermissions, workflow_name)",
        // returns true if the user may delete this object
        
        mayEdit: "function",
        /*
        returns list of roles that may edit this [role]
        
        Empty means only people listed as owner.
        */

        mayView: "function",
        /*
        Indexed by catalog. Returns list of roles that may view this [role]

        Empty means only people listed as owner.
        */
        
        mayDelete: "function",
        /*
        returns list of roles that may delete this [role]
        
        Empty means only people listed as owner.
        */

        owners: "function"
        /*
        returns list of owners. Indexed by catalog.
        
        An owner can do anything to this object.
        */
    }

})

    