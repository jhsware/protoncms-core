'use strict';
var POST = function (req, res) {
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
    var theData = req.body;
    var objectType = req.params.slug;
    var objectId = req.params.id;
    
    var ObjectPrototype = require('../app/components/' + objectType);
    
    var obj = new ObjectPrototype(theData);
    var objSchema = ObjectPrototype.prototype._implements[0].schema;
    
    // Validate data
    var schemaErrors = objSchema.validate(obj);
    if (schemaErrors) { 
        console.log('### Data Error! ###');
        console.log(schemaErrors);
        return res.status(400).json(schemaErrors);
    };
    
    // End data validation
    console.log('*** POST RECEIVED *** ');
    console.log(objectType);
    console.log(obj);
    return console.log(theData);
};

module.exports.POST = POST;

/*

        var idVal = parseInt(params.objectId.replace("obj_",""));
        
        if (idVal % 2 == 0) {
            var obj = new ProtonObject({
                title: "I am a Simple Proton Object",
                _id: params.objectId,
                _workflowId: 'xxx'
            });            
        } else {
            var obj = new User({
                title: "I am a User",
                role: undefined,
                description: undefined,
                _id: params.objectId,
                _workflowId: 'xxx'
            });
        }

*/

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
    var theData = req.body;
    var objectType = req.params.slug;
    var objectId = req.params.id;
    
    var ObjectPrototype = require('../app/components/' + objectType);
    
    var obj = new ObjectPrototype({
        title: "I am a " + objectType,
        role: undefined,
        description: undefined,
        _id: objectId,
        _workflowId: 'xxx'
    });
    
    // End data validation
    console.log('*** GET RECEIVED *** ');
    console.log(objectType);
    return res.json(obj);
};

module.exports.GET = GET;