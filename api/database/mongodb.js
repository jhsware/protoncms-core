'use strict';
var monk = require('monk');
var createUtility = require('component-registry').createUtility;
var assert = require('assert');

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


var IDatabaseService = require('../../app/interfaces').IDatabaseService;

var dbName = require('../../config').mongoDbName;
var monkDbUrl = require('../../config').mongoDbHost + '/' + dbName;

var MongoDbDatabaseService = createUtility({
    implements: IDatabaseService,
    name: 'mongodb',
    
    _getDb: function () {
        if (!this._db) {
            this._db = monk(monkDbUrl);
        }
        // Add connection counter
        if (!this._dbConnections) {
            this._dbConnections = 1
        } else {
            this._dbConnections++
        }
        // Check if there is a close db timer running, in which case close it
        if (this._dbCloseTimeout) {
            clearTimeout(this._dbCloseTimeout);
        };
        
        return this._db;
        
    },
    
    _closeDb: function () {
        this._dbConnections--
        this._dbCloseTimeout = setTimeout(function () {
            if (!this._dbConnections) {
                this._db.close();
                delete this._db;
            }
        }.bind(this), 1000);
    },
    
    drop: function (collectionName, callback) {
        var db = this._getDb();
        var collection = db.get(collectionName);
        collection.drop(callback);
        db.close();
    },
    
    insert: function (collectionName, data, callback) {
        var db = this._getDb();
            
        // TODO: pass user so we get the real user
        var user = {
            _id: 'anonymous'
        }
        
        data._createdAt = data._modifiedAt = Date.now();
        data._createdByUserId = data._modifiedByUserId = user._id;
        
        data._parentId = collectionName;
        data._parentPath = '/' + collectionName;
        
        // Add the creator as default owner
        data._permissions.owners.push(user._id);
            
        var collection = db.get(collectionName);
        var promise = collection.insert(data);
        promise.error(function (err) {
            callback(err);
        });
        promise.success(function (doc) {
            callback(undefined, doc);
        });
        promise.complete(function (err, doc) {
            db.close();
        });
    },
    
    update: function (collectionName, id, data, callback) {
        // Update object in database
        var db = this._getDb();
        
        data._modifiedAt = Date.now();

        // Create a mongodb ObjectID
        var objId = ObjectID.createFromHexString(id);

        var collection = db.get(collectionName);
        collection.updateById(objId, {
            $set: data,
            //$currentDate: { "_modifiedAt": { $type: "timestamp" } }
        }, function (err, doc) {
            callback(err, doc);
        });
    }, 
    
    fetchById: function (collectionName, id, callback) {

        var db = this._getDb();
        
        // Create a mongodb ObjectID
        var objId = ObjectID.createFromHexString(id);
        
        var collection = db.get(collectionName);
        collection.findById(objId, function (err, doc) {
            db.close();
            
            if (err) {
                return callback(err);
            };
            
            callback(undefined, doc);
        });    

    },
    
    query: function (collectionName, query, callback) {
        var db = this._getDb();
        
        console.log("Query [" + collectionName + "]:");
        console.log(query);
        
        var collection = db.get(collectionName);
        var promise = collection.find(query)
        promise.error(function (err) {
            callback(err);
        });
        
        promise.success(function (docs) {
            console.log("Result from query: " + docs.length + " items");
            // console.log(docs);

            callback(undefined, docs);
        });
        promise.complete(function (err, docs) {
            db.close();
        });
    },
        
    delete: function (collectionName, id) {
    }
});

global.utilityRegistry.registerUtility(MongoDbDatabaseService);

