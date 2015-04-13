'use strict';

var createInterface = require('component-registry').createInterface;

module.exports.IMainStage = createInterface({
    // adapter (render view for current session)
    name: 'IMainStage'
});

module.exports.IListView = createInterface({
    name: 'IListView',
    members: {
        ReactComponent: "ReactComponent"
    }
});
   
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

module.exports.IContentMenu = createInterface({
    name: 'IContentMenu',
});

module.exports.IContentMenuItem = createInterface({
    name: 'IContentMenuItem',
    members: {
        order: "integer",
        ReactComponent: "ReactComponent"
    }
});

module.exports.IUserWidget = createInterface({
    // adapts IUserSession
    name: 'IUserWidget',
    members: {
        ReactComponent: "ReactComponent"
    }
});

var IAutoFormWidget = createInterface({
    name: 'IAutoFormWidget',
    // Render an object schema as a HTML form
    members: {
        ReactComponent: "ReactComponent"
    }
});
module.exports.IAutoFormWidget = IAutoFormWidget;
