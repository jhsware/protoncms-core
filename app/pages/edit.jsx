'use strict';
var React = require('react');

var IDataFetcher = require('../interfaces').IDataFetcher;
var IEditObject = require('../interfaces').IEditObject;

var Page = React.createClass({
    statics: {
        fetchData: function (params, callback) {
            global.utilityRegistry.getUtility(IDataFetcher, 'getObjectById').fetchData(params, callback);
        }
    },
    
    render: function() {
        
        var data = this.props.data;
        var ReactComponent = global.adapterRegistry.getAdapter(data, IEditObject).ReactComponent;
        
        var workflowId = this.props.params.workflowId; 
        
        return (
            <div>
                <h1>{data.title}</h1>
                <div className="contentList">
                    <ReactComponent key='obj' context={data} workflowId={workflowId} />
                </div>
            </div>
        );
    }
});

module.exports = Page;
