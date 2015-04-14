'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var IEditObject = require('../../interfaces').IEditObject;
var IUser = require('../../interfaces').IUser;

var IInputFieldWidget = require('schema-react-formlib').interfaces.IInputFieldWidget;
var IActionButtonWidget = require('schema-react-formlib').interfaces.IActionButtonWidget;
var IAutoFormWidget = require('../../interfaces').IAutoFormWidget;

var FormActionBar = require('../../layouts/FormActionBar');

var Component = createAdapter({
    implements: IEditObject,
    adapts: IUser,
    
    ReactComponent: React.createClass({
        

        didUpdate: function (data) {
            var state = this.state;
            state.context = data;
            this.setState(state);
        },
        
        getInitialState: function () {
            var state = {};
            state.context = this.props.context;
            return state;
        },
        
        componentWillReceiveProps: function (nextProps) {
            var state = this.state;
            state.context = nextProps.context;
            this.setState(state);
        },
        
        doSubmit: function () {
            console.log("User submitted:");
            console.log(this.state.context);
        },
        
        doCancel: function (e) {
            console.log("User canceled!");
        },
    
        render: function() {
        
            var context = this.state.context;   
            var formSchema = context._implements[0].schema;
            
            var FormWidget = global.adapterRegistry.getAdapter(context, IAutoFormWidget).ReactComponent;
            
            var ActionButton = global.utilityRegistry.getUtility(IActionButtonWidget).ReactComponent;
            
            return (
                <div className="IEditObject">
                    <h2>Edit User</h2>
                    
                    <FormWidget 
                        context={context} 
                        formSchema={formSchema}
                        onChange={this.didUpdate} />
                    
                    
                    <FormActionBar>
                            <ActionButton
                                text="Spara"
                                onClick={this.doSubmit}
                                type="primary"
                                disabled={false}
                                showSpinner={false} />
                            
                            eller
                        
                            <ActionButton
                                text="Ångra"
                                onClick={this.doCancel}
                                type="secondary"
                                disabled={true}
                                showSpinner={false} />
                    </FormActionBar>
                        
                </div>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(Component)

