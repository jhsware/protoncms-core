'use strict';
var assert = require('assert');
var expect = require('expect.js');

// Register database service for mongodb
var Principal = require('../app/permissions').Principal;

describe('A Principal', function() {
    
    it('can be created', function() {
        var principal = new Principal({
            principalId: 'test',
            role: 'manager'
        });
        expect(principal).to.not.be(undefined);
        expect(principal.role).to.equal('manager');
    });

});