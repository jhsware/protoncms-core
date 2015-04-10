'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var Input       = require('react-bootstrap').Input;

var IEditObject = require('../../interfaces').IEditObject;
var IProtonObject = require('../../interfaces').IProtonObject;

var IInputFieldWidget = require('schema-react-formlib').interfaces.IInputFieldWidget;

var Component = createAdapter({
    implements: IEditObject,
    adapts: IProtonObject,
    
    ReactComponent: React.createClass({
    
        render: function() {
            
            var context = this.props.context;
            
            var theFormEls = [];
            var schemaFields = context._implements[0].schema._fields;
            for (var fieldKey in schemaFields) {
                var InputWidget = global.adapterRegistry.getAdapter(schemaFields['title'], IInputFieldWidget).ReactComponent;
                theFormEls.push(
                    <div className="IEditObject-formRow">
                        <InputWidget
                            type="text"
                            value={context[fieldKey]}
                            placeholder={schemaFields[fieldKey].placeholder}
                            label={schemaFields[fieldKey].title}
                            help={schemaFields[fieldKey].help}
                            hasFeedback
                            ref="input" />
                    </div>
                )
            };
            
            return (
                <div className="IEditObject">
                    <h2>Edit Object</h2>

                    {theFormEls}

                </div>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(Component)

