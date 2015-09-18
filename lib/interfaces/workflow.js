'use strict';
var createInterface = require('component-registry').createInterface;
    
module.exports.IWorkflow = createInterface({
    /*
    A workflow collection object prototype where workflow objects are stored. The idea is to extend this object prototype
    when creating specific workflows. Content objects that want to use a workflow can extend
    one or more of the specific workflow object prototypes, but other workflows can also be implemented
    and added ad hoc in an app.
    */
    
    name: 'IWorkflow',
    members: {
        _workflows: "object -- collection of workflows"
    }
});

module.exports.IWorkflowState = createInterface({
    /*
    An adapter to interact with a workflow. This allows permission checks etc to be performed.
    */
    
    name: 'IWorkflowState',
    members: {
        getState: "function -- get the state of adapted workflow object",
        setState: "function -- set the state of adapted workflow object",
        getAllStates: "function -- returns all defined workflow states for this workflow",
        getAvailableStates: "function -- returns available workflow states given permissions and current state",
    }
});