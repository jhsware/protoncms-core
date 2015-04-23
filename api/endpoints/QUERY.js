'use strict';
var statusCodes = require('./statusCodes');

var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var IProtonObjectPersist = require('../../app/interfaces').IProtonObjectPersist;
var components = require('../../app/components');

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

module.exports = QUERY;