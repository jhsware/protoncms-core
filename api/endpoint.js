'use strict';
var statusCodes = {
    RequestOk: 200,
    ValidationError: 400,
    DatabaseError: 500,
}

var IDatabaseService = require('../app/interfaces').IDatabaseService;
var IProtonObjectPersist = require('../app/interfaces').IProtonObjectPersist;
var components = require('../app/components');

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
    
    var ObjectPrototype = components[objectType];
    
    var obj = new ObjectPrototype(theData);
    var objSchema = ObjectPrototype.prototype._implements[0].schema;
    
    // Validate data
    var schemaErrors = objSchema.validate(obj);
    if (schemaErrors) { 
        // console.log('### Data Error! ###');
        // console.log(schemaErrors);
        schemaErrors.fieldErrors.birth_year = { type: 'required', message: 'REQUIRED!' };
        return res.status(statusCodes.ValidationError).json({
            server_errors: schemaErrors
        });
    };
    
    // Submitted object passed validation so let's persist it to the backen
    console.log("Let's persist this guy...");
    var pa = global.adapterRegistry.getAdapter(obj, IProtonObjectPersist);
    pa.persist(function (err, data) {
        if (err) {
            return res.status(statusCodes.DatabaseError).json({
                err: err
            });
        }
        
        return res.status(statusCodes.RequestOk).json({
            objectType: data._type,
            data: data
        });
    });
};

module.exports.POST = POST;

var GET = function (req, res) {
    /*
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
    var objectType = req.params.objectType;
    var objectId = req.params.id;

    // End data validation
    console.log('*** GET RECEIVED *** ');
    console.log(objectType);
        
    // Submitted object passed validation so let's persist it to the backen
    console.log("Let's get this object...");
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    dbUtil.fetchById(objectType, objectId, function (err, obj) {
        
        if (err) {
            return console.error(err);
        };
        
        // Let's return the result
        return res.status(statusCodes.RequestOk).json({
            objectType: obj._type,
            data: obj
        });
        
    });
};

module.exports.GET = GET;

var QUERY = function (req, res) {
    /*
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
    var objectType = req.params.objectType;

    // End data validation
    console.log('*** QUERY RECEIVED *** ');
    console.log(objectType);
    
    
    console.log("Let's get these objects...");
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    dbUtil.query(objectType, {}, function (body) {
        if (body.status == 'ok') {
            res.status(statusCodes.RequestOk).json({
                status: 'ok',
                data: body.data
            });
        } else {
            res.status(statusCodes.DatabaseError).json({
                status: 'error',
                message: 'Database Error: Could not fetch objects!'
            });
        }
    });
};

module.exports.QUERY = QUERY;