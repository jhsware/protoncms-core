'use strict';
var createInterface = require('component-registry').createInterface;

module.exports.ITemplateService = createInterface({
    /*
    This utility is used to access message templates, it should be used in the API-layer not on the client.
    */
    
    name: 'ITemplateService',
    members: {
        getTemplate: "function",
        listTemplates: "function"
    }
})

module.exports.ITemplateRenderer = createInterface({
    name: 'ITemplateRenderer',
    
    members: {
        render: "function (variables) -- renders object"
    }
})

module.exports.IMessageService = createInterface({
    /*
    This utility is used to send messages, it should be used in the API-layer not on the client.
    */
    
    name: 'IMessageService',
    members: {
        send: "function",
        sendBatch: "function"
    }
})
