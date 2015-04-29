'use strict';
var assert = require('assert');
var expect = require('expect.js');

require('./util-testdom')('<html><body></body></html>');
var React = require('react/addons');


/*
    Create the global component registry
*/    
var _createRegistry = (function () {
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
})()
/*
    /END COMPONENT REGISTRY/
*/  

var User = require('../app/components').User;

describe('A User', function() {
    
    it('can be created', function() {
        var user = new User({
            principalId: "user",
            title: 'Test User',
            role: 'manager'
        });
        
        expect(user).to.not.be(undefined);
        expect(user.role).to.equal('manager');
    });
    
    // TODO: implements IPrincipal
    // TODO: implements IUser
    // TODO: has unique principalId
    // TODO: has unique email

});