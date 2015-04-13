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
        
        doSubmit: function (data) {
            console.log("User submitted:");
            console.log(data);
        },
        
        doCancel: function (e) {
            console.log("User canceled!");
        },
    
        render: function() {
        
            var context = this.props.context;   
            var formSchema = context._implements[0].schema;
            
            var FormWidget = global.adapterRegistry.getAdapter(context, IAutoFormWidget).ReactComponent;
            
            return (
                <div className="IEditObject">
                    <h2>Edit User</h2>
                    
                    <FormWidget 
                        context={context} 
                        formSchema={formSchema}
                        
                        doSubmit={this.doSubmit} 
                        doCancel={this.doCancel} />
                    
                </div>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(Component)

