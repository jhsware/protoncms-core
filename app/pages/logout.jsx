'use strict';
var React = require('react');
var createAdapter = require('component-registry').createAdapter;

var IApiCall = require('../interfaces').IApiCall;
var IDataFetcher = require('../interfaces').IDataFetcher;

var Page = React.createClass({
        
    contextTypes: {
        router: React.PropTypes.func
    },
    
    statics: {
        fetchData: function (params, callback) {
            global.utilityRegistry.getUtility(IApiCall, 'logout').logout(params, callback);
        }
    },
        
    componentDidMount: function () {
        this.context.router.transitionTo('/users/login');
    },
    
    render: function() {
            
        return (
            <div className="IEditObject">
                <h2>Logging out...</h2>
            </div>
        );
    }
});

module.exports = Page;

