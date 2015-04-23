'use strict'

var express = require('express');
var bodyParser = require('body-parser');

// Good stuff
var router = express.Router();
var jsonParser = bodyParser.json();

/*
    Create the global component registry
*/    
if (!global.utilityRegistry) {
    console.log('[App] Creating component utility registry');
    var UtilityRegistry = require('component-registry').UtilityRegistry;
    global.utilityRegistry = new UtilityRegistry();
}
if (!global.adapterRegistry) {
    console.log('[App] Creating component adapter registry');
    var AdapterRegistry = require('component-registry').AdapterRegistry;
    global.adapterRegistry = new AdapterRegistry();
}
/*
    /END COMPONENT REGISTRY/
*/

// Register database services
require('./database');


// CREATE
router.post('/:objectType', require('./endpoint').POST);
// UPDATE
router.post('/:objectType/:id', jsonParser, require('./endpoint').POST);
// QUERY
router.get('/:objectType', require('./endpoint').QUERY);
// READ
router.get('/:objectType/:id', require('./endpoint').GET);
// TODO: DELETE
//router.delete('/:objectType/:id', require('./endpoint').DELETE);

module.exports = router;