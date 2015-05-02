'use strict';
var statusCodes = require('./statusCodes');

var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var components = require('../../app/components');
var Principal = require('../../app/permissions').Principal;

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

    // DEBUGGING
    console.log("This is the logged in user:");
    console.log(req.user);

    // End data validation
    console.log('*** GET RECEIVED *** ');
    console.log(objectType);
        
    // Submitted object passed validation so let's persist it to the backen
    console.log("Let's get this object...");
    if (!req.user) {
        return res.status(statusCodes.AuthenticationError).json({
            message: "You aren't logged in!"
        });
    }
    var principal = req.user;
    
    var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
    
    dbUtil.fetchById(principal, objectType, objectId, function (err, obj) {
        
        if (err) {
            return console.error(err);
        };
        
        // Let's return the result
        return res.status(statusCodes.RequestOk).json({
            currentUser: req.user,
            data: obj
        });
        
    });
};

module.exports = GET;
