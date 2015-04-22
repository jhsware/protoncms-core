'use strict';
var React = require('react');

var IDataFetcher = require('../interfaces').IDataFetcher;
var IEditObject = require('../interfaces').IEditObject;

var Page = React.createClass({
    statics: {
        fetchData: function (params, callback) {
            global.utilityRegistry.getUtility(IDataFetcher, 'fetchObjectById').fetchData(params, callback);
        }
    },
    
    render: function() {
        
        var obj = this.props.data.content;
        var ReactComponent = global.adapterRegistry.getAdapter(obj, IEditObject).ReactComponent;
        
        var workflowId = this.props.params.workflowId; 
        
        return (
            <div>
                <h1>{obj.title}</h1>
                <div className="contentList">
                    <ReactComponent key='obj' context={obj} workflowId={workflowId} />
                </div>
            </div>
        );
    }
});

module.exports = Page;
