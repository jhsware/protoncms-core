'use strict';
var assert = require('assert');
var expect = require('expect.js');

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

// Register database service for mongodb
require('../api/database/mongodb')(global);

var IDatabaseService = require('../app/interfaces').IDatabaseService;
var Principal = require('../app/permissions').Principal;
var rootPrincipal = require('../app/permissions').rootPrincipal;

var getTestObject = function () {
    return {
        _owners: [],
        _permissionsView: ['owner', 'manager'],
        _permissionsEdit: ['owner', 'manager'],
        _permissionsDelete: ['owner', 'manager'],
        title: "Test Object!"
    };
    
};

describe('The mongodb database service utility', function() {
    var dbUtil;
    
    before(function(done) {
        dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        dbUtil._closeDbTimeout = 10;
        done();
    });
    
    afterEach(function(done) {
        dbUtil._closeDb(function (err) {
            done();
        });
    });
    
    it('can be found', function() {
        expect(dbUtil).to.not.be(undefined);
    });
    
    it('has an insert method', function() {
        expect(typeof dbUtil.insert).to.equal("function");
    });

    it('has an update method', function() {
        expect(typeof dbUtil.update).to.equal("function");
    });
    
    it('has a query method', function() {
        expect(typeof dbUtil.query).to.equal("function");
    });
    
    it('has a fetchById method', function() {
        expect(typeof dbUtil.fetchById).to.equal("function");
    });
    
    it('has a delete method', function() {
        expect(typeof dbUtil.delete).to.equal("function");
    });

    it('can open the db', function() {
        var db = dbUtil._getDb();
        expect(db).not.to.be(undefined);
    });
    
    it('can close the db', function(done) {
        var db = dbUtil._getDb();
        dbUtil._closeDb(function (err) {
            expect(err).to.be(undefined);
            expect(dbUtil._db).to.be(undefined);
            done();
        });
    });
    
    it('does not close db unless _dbConnections counter is zero', function(done) {
        dbUtil._closeDbTimeout = 100;
        var db = dbUtil._getDb();
        var db = dbUtil._getDb();
        
        expect(dbUtil._dbConnections).to.equal(2);
        
        dbUtil._closeDb(function (err) {
            expect(dbUtil._dbConnections).to.equal(1);
            expect(err).to.be(undefined);
            expect(dbUtil._db).to.not.be(undefined);
            
            dbUtil._closeDb(function (err) {
                expect(dbUtil._dbConnections).to.equal(0);
                expect(err).to.be(undefined);
                expect(dbUtil._db).to.be(undefined);
                done();
            });
        });
    });

});
    
describe('The mongodb database service data access', function() {
    
    var testPrincipal;
    var managerPrincipal;
    var otherPrincipal
    var dbUtil;
    
    before(function(done) {
      // get the env specific collection interface
        testPrincipal = new Principal({
            principalId: 'testPrincipal',
            role: 'norole'
        });
        
        managerPrincipal = new Principal({
            principalId: 'testManager',
            role: 'manager'
        });
        
        otherPrincipal = new Principal({
            principalId: 'otherPrincipal',
            role: 'norole'
        });
        
        dbUtil = global.utilityRegistry.getUtility(IDatabaseService, 'mongodb');
        
        done();
    })

    afterEach(function(done){
        dbUtil.drop(rootPrincipal, 'test', function (err) {
            done();
        });
    })
    
    it('allows creation of data', function(done) {

        var testObject = getTestObject();
        
        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc._id).to.not.be(undefined);
            done();
        });
    });
    

    it('allows reading data if owner', function(done) {
        
        var testObject = getTestObject();
        
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
    
    it('allows reading data if role allows it', function(done) {
        

        var testObject = getTestObject();
        
        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc).to.not.be(undefined);
            var obj = doc;
        
            dbUtil.fetchById(managerPrincipal, 'test', obj._id, function (err, doc) {
                expect(doc).to.not.be(undefined);
                expect(err).to.be(undefined);
                expect(doc._id.toString()).to.equal(obj._id.toString());
                done()
            });
        
        });            

        
    });
    
    it('does not allow reading data if not owner and role does not allow it', function(done) {
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc).to.not.be(undefined);
            var obj = doc;
        
            dbUtil.fetchById(otherPrincipal, 'test', obj._id, function (err, doc) {
                expect(doc).to.be(null);
                expect(err).to.be(undefined);
                done()
            });
        
        });
        
    });

    it('allows updating data if owner', function(done) {

        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc).to.not.be(undefined);
            var obj = doc;
            obj.title = "I am updated!";
        
            dbUtil.update(testPrincipal, 'test', obj, function (err, doc) {
                // I am not receiving the new object here so to test it I need to perform
                // a new fetch. 
                dbUtil.fetchById(testPrincipal, 'test', obj._id, function (err, doc) {
                    expect(err).to.be(undefined);
                    expect(doc).to.not.be(undefined);
                    expect(doc._id.toString()).to.equal(obj._id.toString());
                    expect(doc.title).to.equal("I am updated!");
                    done();
                    
                });
            });
        
        });            
        
    });
    
    it('allows updating data if role allows it', function(done) {
        
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc).to.not.be(undefined);
            var obj = doc;
            obj.title = "I am updated!";
        
            dbUtil.update(managerPrincipal, 'test', obj, function (err, doc) {
                // I am not receiving the new object here so to test it I need to perform
                // a new fetch. 
                dbUtil.fetchById(managerPrincipal, 'test', obj._id, function (err, doc) {
                    expect(err).to.be(undefined);
                    expect(doc).to.not.be(undefined);
                    expect(doc._id.toString()).to.equal(obj._id.toString());
                    expect(doc.title).to.equal("I am updated!");
                    done();
                    
                });
            });
        
        });
        
    });
    
    it('does not allow updating data if not owner or role allows it', function(done) {
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(doc).to.not.be(undefined);
            var obj = doc;
            obj.title = "I am updated!";
        
            dbUtil.update(otherPrincipal, 'test', obj, function (err, doc) {
                // I am not receiving the new object here so to test it I need to perform
                // a new fetch. 
                expect(err).to.not.be(undefined);
                expect(doc).to.be(undefined);
                done();
            });
        
        });            
        
    });
    
    it('allows querying data if owner', function(done) {
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(err).to.be(undefined);
            expect(doc).to.not.be(undefined);
        
            dbUtil.query(testPrincipal, 'test', {title: "Test Object!"}, function (err, docs) {
                expect(err).to.be(undefined);
                expect(docs).to.not.be(undefined);
                expect(docs.length).to.equal(1);
                expect(docs[0].title).to.equal("Test Object!");
                done();
            });
        
        });            
        
    });
    
    it('allows querying data if role allows it but not owner', function(done) {
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(err).to.be(undefined);
            expect(doc).to.not.be(undefined);
        
            dbUtil.query(managerPrincipal, 'test', {title: "Test Object!"}, function (err, docs) {
                expect(err).to.be(undefined);
                expect(docs).to.not.be(undefined);
                expect(docs.length).to.equal(1);
                expect(docs[0].title).to.equal("Test Object!");
                done();
            });
        
        });            
        
    });
    
    it('does not allow querying data if neither role allows nor is owner', function(done) {
        
        var testObject = getTestObject();

        dbUtil.insert(testPrincipal, 'test', testObject, function (err, doc) {
            expect(err).to.be(undefined);
            expect(doc).to.not.be(undefined);
        
            dbUtil.query(otherPrincipal, 'test', {title: "Test Object!"}, function (err, docs) {
                expect(err).to.be(undefined);
                expect(docs).to.not.be(undefined);
                expect(docs.length).to.equal(0);
                done();
            });
        
        });            
        
    });
});