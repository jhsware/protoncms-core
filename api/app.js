'use strict'

var express = require('express');
var bodyParser = require('body-parser');

// Good stuff
var router = express.Router();
var jsonParser = bodyParser.json();

// Start page
router.post('/:slug/:id', jsonParser, require('./endpoint').POST);
router.get('/:slug/:id', require('./endpoint').GET);


module.exports = router;