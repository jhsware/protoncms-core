'use strict';
var createObjectPrototype = require('component-registry').createObjectPrototype;
var IWorkflow = require('../interfaces').IWorkflow;

var Workflow = createObjectPrototype({
    implements: [IWorkflow],
    
    constructor: function (params) {
        if (!this.hasOwnProperty('_workflows')) {
            this._workflows = {};
        }
    }
});

module.exports = Workflow;