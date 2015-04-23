'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var IListItemView = require('../../interfaces').IListItemView;
var IProtonObject = require('../../interfaces').IProtonObject;

var RenderListItem = createAdapter({
    implements: IListItemView,
    adapts: IProtonObject,
    
    ReactComponent: React.createClass({
    
        render: function() {
        
            var context = this.props.context;
                 
            return (
                <Link className="IListItemView" to="editObject" params={{parentId: context._type, objectId: context._id}}>
                    <h2>{context.title}</h2>
                </Link>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(RenderListItem)

