'use strict';

var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var IProtonObject = require('../interfaces').IProtonObject;

var formMixin = require('react-formlib').form_mixins.form_mixin;

var IInputFieldWidget = require('schema-react-formlib').interfaces.IInputFieldWidget;
var IAutoFormWidget = require('../interfaces').IAutoFormWidget;

var Component = createAdapter({
    implements: IAutoFormWidget,
    adapts: IProtonObject,
    
    ReactComponent: React.createClass({
        
        mixins: [formMixin],
        
        getInitialState: function () {
            var state = {}
            state.context = this.props.context;
            return state;
        },
        
        componentWillReceiveProps: function (nextProps) {
            var state = this.state;
            state.context = nextProps.context;
            this.setState(state);
        },
        
        doSubmit: function (e) {
            this.props.doSubmit(this.state.context);
        },
        
        doCancel: function (e) {
            this.props.doCancel(e);
        },
    
        render: function() {
            
            var context = this.state.context;
            
            var theFormEls = [];
            
            var formSchema = this.props.formSchema;
            var schemaFields = formSchema._fields;
            
            for (var fieldKey in schemaFields) {
                var InputWidget = global.adapterRegistry.getAdapter(schemaFields[fieldKey], IInputFieldWidget).ReactComponent;
                var theSchemaField = schemaFields[fieldKey];
                theFormEls.push(
                    <div className="IEditObject-formRow">
                        <InputWidget
                            formSchema={formSchema}
                            name={fieldKey}
                            options={theSchemaField.options}
                            fieldErrors={this.state.fieldErrors}
                            invariantErrors={this.state.invariantErrors}
                            serverErrors={this.props.server_errors}
                            
                            type="text"
                            value={context[fieldKey]}
                            placeholder={theSchemaField.placeholder}
                            label={theSchemaField.label}
                            help={theSchemaField.help}
                            addonAfter={theSchemaField.prefix}
                            addonBefore={theSchemaField.suffix}
                            hasFeedback 
                            
                            onChange={this.didUpdate} />
                    </div>
                )
            };
            
            return (
                <div className="IAutoFormWidget">

                    {theFormEls}

                </div>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(Component)

