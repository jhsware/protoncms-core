'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var IListItemView = require('../../interfaces').IListItemView;
var IUser = require('../../interfaces').IUser;

var RenderListItem = createAdapter({
    implements: IListItemView,
    adapts: IUser,
    
    ReactComponent: React.createClass({
    
        render: function() {
        
            var context = this.props.context;
                 
            return (
                <Link className="IListItemView" to="editObject" params={{workflowId: context._type, objectId: context._id}}>
                    <h2>{context.title}</h2>
                    <h3>My role is: {context.role}</h3>
                </Link>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(RenderListItem)

