'use strict'

var express = require('express');
var bodyParser = require('body-parser');

// Good stuff
var router = express.Router();
var jsonParser = bodyParser.json();

// Register database services
require('./database');

// LOGIN
router.post('/login', jsonParser, require('./endpoints/login'));

// CREATE
router.post('/:objectType', require('./endpoints/POST'));
// UPDATE
router.post('/:objectType/:id', jsonParser, require('./endpoints/POST'));
// QUERY
router.get('/:objectType', jsonParser, require('./endpoints/QUERY'));
// READ
router.get('/:objectType/:id', require('./endpoints/GET'));
// TODO: DELETE
//router.delete('/:objectType/:id', require('./endpoint').DELETE);

module.exports = router;