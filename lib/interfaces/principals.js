'use strict';
var createInterface = require('component-registry').createInterface;

/*
    A user in the system must implement IPrincipal to get the _principalId 
    that is used to determine ownership and creation etc.

    So whenever we get the IDataService we first try to get an adapter and 
    then a utility, the latter used for anonymous users, the prior for logged
    in users.
*/

module.exports.IPrincipal = createInterface({
    name: "IPrincipal",
    members: {
        _principalId: "string"
    }
});

module.exports.IRootPrincipal = createInterface({
    name: "IRootPrincipal",
    members: {
        _principalId: "string"
    }
});

module.exports.IAnonymousPrincipal = createInterface({
    name: "IAnonymousPrincipal",
    members: {
        _principalId: "string"
    }
});