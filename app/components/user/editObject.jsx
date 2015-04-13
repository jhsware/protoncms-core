'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var IEditObject = require('../../interfaces').IEditObject;
var IUser = require('../../interfaces').IUser;

var IInputFieldWidget = require('schema-react-formlib').interfaces.IInputFieldWidget;
var IAutoFormWidget = require('../../interfaces').IAutoFormWidget;

var Component = createAdapter({
    implements: IEditObject,
    adapts: IUser,
    
    ReactComponent: React.createClass({
    
        render: function() {
        
            var context = this.props.context;   
            
            var FormWidget = global.adapterRegistry.getAdapter(context, IAutoFormWidget).ReactComponent;
            
            return (
                <div className="IEditObject">
                    <h2>Edit User</h2>
                    
                    <FormWidget context={context} />
                    
                </div>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(Component)

