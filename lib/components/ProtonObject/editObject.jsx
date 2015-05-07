'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var IEditObject = require('../../interfaces').IEditObject;
var IProtonObject = require('../../interfaces').IProtonObject;

var Component = createAdapter({
    implements: IEditObject,
    adapts: IProtonObject,
    
    ReactComponent: React.createClass({
        
        contextTypes: {
            router: React.PropTypes.func
        },

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
        
        submitCallback: function (err, body, statusCode) {
            var state = this.state;
            if (statusCode == 400) {
                state.server_errors = body.server_errors;
            } else if (statusCode == 200) {
                // Request was a success, now check if we created a new object, in
                // which case redirect to that object
                var data = body.data;
                if (this.state.context._id !== data._id) {
                    // Redirect to new object
                    this.context.router.transitionTo('editObject', {parentId: data._type, objectId: data._id});
                } else {
                    var ObjectPrototype = components[body.objectType];
                    var obj = new ObjectPrototype(data);
                    state.server_errors = undefined;
                    state.context = obj;                    
                }
            }
            this.setState(state);
        },
        
        doSubmit: function () {
            console.log("User submitted:");
            console.log(this.state.context);
            
            global.adapterRegistry.getAdapter(this.state.context, IProtonObjectPersist).persist(this.submitCallback);
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
                        server_errors={this.state.server_errors}
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