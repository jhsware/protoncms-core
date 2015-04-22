'use strict';
var React = require('react');

var IDataFetcher = require('../interfaces').IDataFetcher;
var IListItemView = require('../interfaces').IListItemView;

var Page = React.createClass({
    statics: {
        fetchData: function (params, callback) {
            global.utilityRegistry.getUtility(IDataFetcher, 'listObjects').fetchData(params, callback);
        }
    },
    
    render: function() {
        
        var workflowId = this.props.params.workflowId || 'default';
        var data = this.props.data;
        
        var contentEls = data.content.map(function (obj, i) {
            var ReactComponent = global.adapterRegistry.getAdapter(obj, IListItemView).ReactComponent;
            obj._workflowId = workflowId;
            return <ReactComponent key={'item-' + i} context={obj} />;            
        });
        
        return (
            <div>
                <h1>{'Content of ' + workflowId}</h1>
                <div className="contentList">
                    {contentEls}
                </div>
            </div>
        );
    }
});

module.exports = Page;
