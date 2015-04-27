'use strict';
var assert = require('assert');
var expect = require('expect.js');

var global = {};

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


var _registerDbService = function () {
    require('../api/database/mongodb')(global);
};

var IDatabaseService = require('../app/interfaces').IDatabaseService;
var Principal = require('../app/permissions').Principal;
var rootPrincipal = require('../app/permissions').rootPrincipal;

var testPrincipal = new Principal({
    _principalId: 'test',
    _role: 'manager'
});

var getTestObject = function () {
    return {
        _owners: [],
        _permissionsView: ['owner', 'manager'],
        _permissionsEdit: ['owner', 'manager'],
        _permissionsDelete: ['owner', 'manager'],
        title: "Test Object!"
    };
    
};

describe('The mongodb database service', function() {
    it('can be created', function(done) {        
        _registerDbService();
        done();
    });
    
    it('can be found', function() {
        var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        expect(dbUtil).to.not.be(undefined);
    });
    
    it('allows creation of data', function(done) {
        var testObject = getTestObject();
        var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc._id).to.not.be(undefined);
            done()
        });
    });
    

    it('allows reading data if owner', function(done) {
        var testObject = getTestObject();
        var dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        dbUtil.drop(rootPrincipal, 'test', function (err) {
            expect(err).to.be(undefined);
            dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
                expect(doc).to.not.be(undefined);
                var obj = doc;
            
                dbUtil.fetchById(testPrincipal, 'test', obj._id, function (err, doc) {
                    expect(doc).to.not.be(undefined);
                    expect(err).to.be(undefined);
                    expect(doc._id.toString()).to.equal(obj._id.toString());
                    done()
                });
            
            });            
        });
        
    });
    /*
    it('does not allow reading data if not owner', function() {        
    });
    */

});