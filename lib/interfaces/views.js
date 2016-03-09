'use strict';

var createInterface = require('component-registry').createInterface;

/*

    NOTE: These are basic CMS views. You might not implement these
    for all your objects

*/

module.exports.IListItemView = createInterface({
    // An object rendered in a list view
    name: 'IListItemView',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IListItemEdit = createInterface({
    // An object rendered in a list view when editing inline
    name: 'IListItemEdit',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IViewObject = createInterface({
    // An object rendered on a single page as view only
    name: 'IViewObject',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IEditObject = createInterface({
    // An object rendered on a single page as a form for editing,
    // this may or may not use an IAutoFormWidget.
    name: 'IEditObject',
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IAutoFormWidget = createInterface({
    // Render the objects schema as a form
    name: 'IAutoFormWidget',
    // Render an object schema as a HTML form
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IInputFieldWidget = createInterface({
    // Render the objects schema as a form
    name: 'IInputFieldWidget',
    // Render an object schema as a HTML form
    members: {
        ReactComponent: "ReactComponent"
    }
});

module.exports.IActionBarWidget = createInterface({
    name: 'IActionBarWidget'
    // Render an action bar that is sticky
});

module.exports.IActionButtonWidget = createInterface({
    name: 'IActionButtonWidget'
    // Render an action button as HTML
});

module.exports.IDropArea = createInterface({
    name: 'IDropArea'
    // This is a drop area, calls onDrop when receiving a file
});

module.exports.IMessagePopupWidget = createInterface({
    name: 'IMessagePopupWidget'
    // This is a drop area, calls onDrop when receiving a file
});
