'use strict';
var createAdapter = require('component-registry').createAdapter;

var IFieldDummyData = require('schema-dummy-data').interfaces.IFieldDummyData;
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
                var FieldDummyData = global.adapterRegistry.getAdapter(schemaFields[fieldKey], IFieldDummyData);
                this.context[fieldKey] = FieldDummyData.generate();
            } catch (e) {
                console.error("No field dummy data adapter found for " + field._implements[0]);
            }
        };
    }
});

global.adapterRegistry.registerAdapter(DummyData)
