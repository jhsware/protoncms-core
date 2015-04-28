'use strict';
var monk = require('monk');
var createUtility = require('component-registry').createUtility;
var assert = require('assert');

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var mquery = require('mquery');

var IDatabaseService = require('../../app/interfaces').IDatabaseService;
var IRootPrincipal = require('../../app/interfaces').IRootPrincipal;

var dbName = require('../../config').mongoDbName;
var monkDbUrl = require('../../config').mongoDbHost + '/' + dbName;

var actions = {
    VIEW: 'View',
    EDIT: 'Edit',
    DELETE: 'Delete'
};

var MongoDbDatabaseUtility = createUtility({
    implements: IDatabaseService,
    name: 'mongodb',
    
    _closeDbTimeout: 1000, // in millisecs
    
    _getDb: function () {
        if (!this._db) {
            this._db = monk(monkDbUrl);
        }
        // Add connection counter
        if (!this._dbConnections) {
            this._dbConnections = 1;
        } else {
            this._dbConnections++;
        }
        // Check if there is a close db timer running, in which case close it
        if (this._dbCloseTimeout) {
            clearTimeout(this._dbCloseTimeout);
        };
        
        return this._db;
        
    },
    
    _closeDb: function (cb) {
        this._dbConnections > 0 ? this._dbConnections-- : "";
        
        this._dbCloseTimeout = setTimeout(function () {
            if (!this._dbConnections && this._db) {
                this._db.close();
                delete this._db;
            }
            cb && cb(undefined);
        }.bind(this), this._closeDbTimeout);
    },
    
    _getPermissionQuery: function (collection, principal, action) {
        // TODO: Check if we passed a valid action...
        
        var tmpOwnerPermission = {};
        tmpOwnerPermission['_permissions' + action] = {
            $all: ['owner']
        };
        
        var tmpRolePermission = {};
        tmpRolePermission['_permissions' + action] = {
            $all: [principal.role]
        };
            
        
        return mquery(collection)
            .where().or([{ 
                // principal is owner and owner may view
                $and: [
                    tmpOwnerPermission, {
                        _owners: {
                            $all: [principal._principalId]
                        }
                    }]
            }, tmpRolePermission])
            .toConstructor();
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
    
    update: function (principal, collectionName, data, callback) {
        // TODO: Check that this principal is allowed to do this!!!
        
        // Update object in database
        var db = this._getDb();
        
        data._modifiedAt = Date.now();
        data._modifiedByPrincipalId = principal._principalId;

        // Create a mongodb ObjectID
        var objId = ('string' == typeof id ? ObjectId.createFromHexString(data._id) : data._id);

        var collection = db.get(collectionName);
        
        var permissionQuery = this._getPermissionQuery(collection, principal, actions.EDIT);
        
        // Monks findOneAndUpdate doesn't play well with mquery so I need a work around
        permissionQuery()
            .where('_id').equals(objId)
            .findOne()
            .then(
                function (doc) {
                    if (doc === null) {
                        return callback("You don't have permission");
                    };
                    var promise = collection.updateById(objId, data);
                    promise.error(function (err) {
                        callback(err);
                    });
                    promise.success(function (res) {
                        callback(undefined, data);
                    });
                    promise.complete(function (err) {
                        this._closeDb();
                    }.bind(this));
                }.bind(this),
            
                function (err) {
                    this._closeDb();
                    callback(err);
                }.bind(this)
            )
    }, 
    
    fetchById: function (principal, collectionName, objId, callback) {
        // TODO: Check that this principal is allowed to do this!!!
        
        var db = this._getDb();
        
        // Create a mongodb ObjectID
        var objId = ('string' == typeof id ? ObjectId.createFromHexString(objId) : objId);
        
        var collection = db.get(collectionName);
                
        var permissionQuery = this._getPermissionQuery(collection, principal, actions.VIEW);
        
        permissionQuery()
            .where('_id').equals(objId)
            .findOne()
            .then(
                function (doc) {
                    callback(undefined, doc);
                },
                
                function (err) {
                    callback(err);
                }
            )
            .then(function () {
                this._closeDb();
            }.bind(this));
    },
    
    query: function (principal, collectionName, query, callback) {
        // TODO: Add principal credentials check to query
        
        var db = this._getDb();
        
        // console.log("Query [" + collectionName + "]:");
        // console.log(query);
        
        var collection = db.get(collectionName);
                
        var permissionQuery = this._getPermissionQuery(collection, principal, actions.VIEW);
        
        permissionQuery()
            .find(query)
            .then(
                function (doc) {
                    callback(undefined, doc);
                },
            
                function (err) {
                    callback(err);
                }
            )
            .then(function () {
                this._closeDb();
            }.bind(this));
    },
        
    delete: function (collectionName, id) {
        // TODO: Implement delete document
        
        // 1 perform a find to check permissions
        
        // 2 delete if allowed
    }
});

module.exports = function (mountPoint) {
    mountPoint.utilityRegistry.registerUtility(MongoDbDatabaseUtility)
}

