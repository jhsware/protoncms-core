'use strict';
var registry = require('../../globalRegistry');
var createAdapter = require('component-registry').createAdapter;

var IFieldDummyData = require('../../interfaces').IFieldDummyData;
var IDummyData = require('../../interfaces').IDummyData;
var IProtonObject = require('../../interfaces').IProtonObject;

var DummyData = createAdapter({
    implements: IDummyData,
    adapts: IProtonObject,
    
    populate: function () {
        var schemaFields = this.context._implements[0].schema._fields;
        for (var fieldKey in schemaFields) {
            var field = schemaFields[fieldKey];
            
            try {
                var FieldDummyData = registry.getAdapter(schemaFields[fieldKey], IFieldDummyData);
                this.context[fieldKey] = FieldDummyData.generate();
                console.log(fieldKey + " = " + this.context[fieldKey]);
            } catch (e) {
                console.warn("No field dummy data adapter found for " + field._implements[0] + " :: " + fieldKey);
            }
        };
    }
});

require('../../globalRegistry').registerAdapter(DummyData);