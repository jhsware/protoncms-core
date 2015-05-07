'use strict';

var createInterface = require('component-registry').createInterface;

module.exports.IListItemView = createInterface({
    name: 'IListItemView',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IListItemEdit = createInterface({
    name: 'IListItemEdit',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IViewObject = createInterface({
    name: 'IViewObject',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IEditObject = createInterface({
    name: 'IEditObject',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IAutoFormWidget = createInterface({
    name: 'IAutoFormWidget',
    // Render an object schema as a HTML form
    members: {
        ReactComponent: "ReactComponent"
    }
});
