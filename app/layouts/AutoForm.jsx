'use strict';

var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var IProtonObject = require('../interfaces').IProtonObject;

var IInputFieldWidget = require('schema-react-formlib').interfaces.IInputFieldWidget;
var IAutoFormWidget = require('../interfaces').IAutoFormWidget;

var Component = createAdapter({
    implements: IAutoFormWidget,
    adapts: IProtonObject,
    
    ReactComponent: React.createClass({
    
        render: function() {
            
            var context = this.props.context;
            
            var theFormEls = [];
            var schemaFields = context._implements[0].schema._fields;
            for (var fieldKey in schemaFields) {
                var InputWidget = global.adapterRegistry.getAdapter(schemaFields['title'], IInputFieldWidget).ReactComponent;
                var theSchemaField = schemaFields[fieldKey];
                theFormEls.push(
                    <div className="IEditObject-formRow">
                        <InputWidget
                            type="text"
                            value={context[fieldKey]}
                            placeholder={theSchemaField.placeholder}
                            label={theSchemaField.label}
                            help={theSchemaField.help}
                            addonAfter={theSchemaField.prefix}
                            addonBefore={theSchemaField.suffix}
                            hasFeedback />
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

