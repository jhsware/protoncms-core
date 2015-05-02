'use strict';
var statusCodes = require('./statusCodes');

var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var IProtonObjectPersist = require('../../app/interfaces').IProtonObjectPersist;
var components = require('../../app/components');
var Principal = require('../../app/permissions').Principal;

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
    var query = req.params.query;

    // End data validation
    
    if (!req.user) {
        return res.status(statusCodes.AuthenticationError).json({
            message: "You aren't logged in!"
        });
    }
    var principal = req.user;
    
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    
    dbUtil.query(principal, objectType, query, function (err, docs) {
        if (err) {
            return res.status(statusCodes.DatabaseError).json({
                status: 'error',
                message: 'Database Error: Could not fetch objects!'
            });
        }

        return res.status(statusCodes.RequestOk).json({
            currentUser: req.user,
            data: docs
        });
    });
};

module.exports = QUERY;