'use strict';
var monk = require('monk');
var createUtility = require('component-registry').createUtility;
var assert = require('assert');

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var IRootPrincipal = require('../../app/interfaces').IRootPrincipal;

var dbName = require('../../config').mongoDbName;
var monkDbUrl = require('../../config').mongoDbHost + '/' + dbName;

var MongoDbDatabaseUtility = createUtility({
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
    
    drop: function (principal, collectionName, callback) {
        // TODO: Check if this is a root princpal
        if (IRootPrincipal.providedBy(principal)) {
            var db = this._getDb();
            var collection = db.get(collectionName);
            var promise = collection.drop();
            promise.error(function (err) {
                callback(err);
            });
            promise.success(function () {
                callback(undefined);
            });
            promise.complete(function (err) {
                this._closeDb();
            }.bind(this));
        } else {
            // TODO: Throw authorisation error
            throw error;
        }
    },
    
    insert: function (principal, collectionName, data, callback) {
        // TODO: Check that this principal is allowed to do this!!!
        
        var db = this._getDb();
        
        data._createdAt = data._modifiedAt = Date.now();
        data._createdByPrincipalId = data._modifiedByPrincipalId = principal._principalId;
        
        data._parentId = collectionName;
        data._parentPath = '/' + collectionName;
        
        // Add the creator as default owner
        data._owners.push(principal._principalId);
            
        var collection = db.get(collectionName);
        var promise = collection.insert(data);
        promise.error(function (err) {
            callback(err);
        });
        promise.success(function (doc) {
            callback(undefined, doc);
        });
        promise.complete(function (err, doc) {
            this._closeDb();
        }.bind(this));
    },
    
    update: function (principal, collectionName, id, data, callback) {
        // TODO: Check that this principal is allowed to do this!!!
        
        // Update object in database
        var db = this._getDb();
        
        data._modifiedAt = Date.now();
        data._modifiedByPrincipalId = principal._principalId;

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
    
    fetchById: function (principal, collectionName, id, callback) {
        // TODO: Check that this principal is allowed to do this!!!
        
        var db = this._getDb();
        
        // Create a mongodb ObjectID
        var objId = ('string' == typeof id ? ObjectId.createFromHexString(id) : id);
        
        var collection = db.get(collectionName);
        
        var query = {
            _id: objId,
            $or: [{ 
                // principal is owner and owner may view
                $and: [
                    {
                        _permissionsView: {
                            $all: ['owner']
                        }
                    }, 
                    {
                        _owners: {
                            $all: [principal._principalId]
                        }
                    }
                ]
            }, {
                // princpal has role that may view
                _permissionsView: {
                    $all: [principal.role]
                }
            }]
        }
        
        var simpleQuery = {
            _id: objId,
            _owners: {
                $all: [principal.role]
            }
        }
        
        var promise = collection.find(query)
        
        promise.error(function (err) {
            callback(err);
        });
        
        promise.success(function (docs) {
            console.log("Result from query: " + docs.length + " items");
            // console.log(docs);

            callback(undefined, docs[0]);
        });
        promise.complete(function (err, docs) {
            this._closeDb();
        }.bind(this));
    },
    
    query: function (principal, collectionName, query, callback) {
        // TODO: Add principal credentials check to query
        
        var db = this._getDb();
        
        console.log("Query [" + collectionName + "]:");
        console.log(query);
        
        query['$or']
        
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
            this._closeDb();
        }.bind(this));
    },
        
    delete: function (collectionName, id) {
    }
});

module.exports = function (mountPoint) {
    mountPoint.utilityRegistry.registerUtility(MongoDbDatabaseUtility)
}

