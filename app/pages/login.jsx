'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var IApiCall = require('../interfaces').IApiCall;
var IActionButtonWidget = require('schema-react-formlib').interfaces.IActionButtonWidget;
var IAutoFormWidget = require('../interfaces').IAutoFormWidget;
var loginForm = require('../forms/loginForm');

var FormActionBar = require('../layouts/FormActionBar');


var Page = React.createClass({
        
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
        state.context = {};
        return state;
    },
    
    componentWillReceiveProps: function (nextProps) {
        var state = this.state;
        state.context = nextProps.context || {};
        this.setState(state);
    },
    
    submitCallback: function (err, body, statusCode) {
        var state = this.state;
        // Code to handle response
        if (err) {
            // Failed, now we need to get the errors out there...
            alert('There was a serious login error!');
        } else if (statusCode != 200) {
            alert('The user could not be authenticated!');
        } else {
            this.context.router.transitionTo('/');            
        }
        
        this.setState(state);
    },
    
    doSubmit: function () {
        console.log("User submitted:");
        console.log(this.state.context);
        
        // Code to submit to API
        var acu = global.utilityRegistry.getUtility(IApiCall, 'login');
        acu.login({
            username: this.state.context.email,
            password: this.state.context.password
        }, this.submitCallback);
    },
    
    doCancel: function (e) {
        console.log("User canceled!");
    },

    render: function() {
    
        var context = this.state.context;   
        var formSchema = loginForm;
        
        var FormWidget = global.utilityRegistry.getUtility(IAutoFormWidget).ReactComponent;
        
        var ActionButton = global.utilityRegistry.getUtility(IActionButtonWidget).ReactComponent;
        
        return (
            <div className="IEditObject">
                <h2>Login</h2>
                
                <FormWidget 
                    context={context} 
                    formSchema={formSchema}
                    server_errors={this.state.server_errors}
                    onChange={this.didUpdate} />
                
                <FormActionBar>
                        <ActionButton
                            text="Logga in"
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
});

module.exports = Page;

