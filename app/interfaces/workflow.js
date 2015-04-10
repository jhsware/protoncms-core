'use strict';

var createInterface = require('component-registry').createInterface;

module.exports.IWorkflow = createInterface({
    // This is a utility that provides access to a collection of objects
    name: 'IWorkflowContainer',
    members: {
        states: "list of states",
        addObject: "function", // Add new object to this workflow
        getObjects: "function", // Allows filtering
        getPublicObjects: "function", // Allows filtering
        getStates: "function", // What states do we allow
        getTransitionsFrom: "function" // Given a state, what transistions can we do
    }
});
    
module.exports.IWorkflowState = createInterface({
    // Adapter to get workflow state on IProtonObject, modifies context._workflowState
    name: "IWorkflowState",
    members: {
        getState: "function",
        setState: "function"
    }
    
});
    
module.exports.IAnonymousSession = createInterface({
    // Object Prototype containing session data if not logged in
    name: 'IAnonymousSession'
});

module.exports.IUserSession = createInterface({
    // Object Prototype containing session data if logged in
    name: 'IUserSession'
});
