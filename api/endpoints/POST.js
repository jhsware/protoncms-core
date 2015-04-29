'use strict';
var statusCodes = require('./statusCodes');
var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var IProtonObjectPersist = require('../../app/interfaces').IProtonObjectPersist;
var components = require('../../app/components');
var Principal = require('../../app/permissions').Principal;

var POST = function (req, res) {
    /*
        CREATE AND UPDATE...
    
        Submit Donation

        Send POST to /api/fundraising/donation

        https://github.com/Cancerfonden/middleware-api/wiki/Notes-for-frontenders

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --data-binary '{"donation_sum":"100","frequency":"once","payment_type":"card"}' \
             http://localhost:3000/api/fundraising/donation
    
    */
    // Get the passed data
    var theData = req.body;
    var objectType = theData._type;
    var objectId = req.params.id;
    var collectionName = objectType; // TODO: This should be changed to proper
    
    var ObjectPrototype = components[objectType];
    
    var obj = new ObjectPrototype(theData);
    var objSchema = ObjectPrototype.prototype._implements[0].schema;
    
    // Validate data
    var schemaErrors = objSchema.validate(obj);
    if (schemaErrors) { 
        // console.log('### Data Error! ###');
        // console.log(schemaErrors);
        // For testing: schemaErrors.fieldErrors.birth_year = { type: 'required', message: 'REQUIRED!' };
        return res.status(statusCodes.ValidationError).json({
            server_errors: schemaErrors
        });
    };
    
    // Submitted object passed validation so let's persist it to the backen
    console.log("Let's persist this guy...");
    var principal = req.user || new Principal({_principalId: 'anonymous'});
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    
    var callback = function (err, data) {

        if (err) {
            return res.status(statusCodes.DatabaseError).json({
                err: err
            });
        }
        
        return res.status(statusCodes.RequestOk).json({
            objectType: data._type,
            data: data
        });
    };
    
    // NOTE! We need to persist the incoming data, otherwise we store properties
    // that are added by the object constructor. We only created the object to allow 
    // proper validation.
    if (theData._id) {
        dbUtil.update(principal, collectionName, theData, callback);
    } else {
        dbUtil.insert(principal, collectionName, theData, callback);
    }
};

module.exports = POST;