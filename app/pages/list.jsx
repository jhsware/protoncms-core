'use strict';
var React = require('react');

var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var IDataFetcher = require('../interfaces').IDataFetcher;
var IListItemView = require('../interfaces').IListItemView;

var Page = React.createClass({
    statics: {
        fetchData: function (params, callback) {
            global.utilityRegistry.getUtility(IDataFetcher, 'listObjects').fetchData(params, callback);
        }
    },
    
    render: function() {
        
        var parentId = this.props.params.parentId || 'default';
        var data = this.props.data;
        
        var contentEls = data.content.map(function (obj, i) {
            var listView = global.adapterRegistry.getAdapter(obj, IListItemView);
            var ReactComponent = listView.ReactComponent;
            return <ReactComponent key={'item-' + i} context={obj} />;            
        });
        
        return (
            <div>
                <Link className="" to="createObject" params={{parentId: 'users', objectType: 'User'}}>
                    Create user...
                </Link>
                <h1>{'Content of ' + parentId}</h1>
                <div className="contentList">
                    {contentEls}
                </div>
            </div>
        );
    }
});

module.exports = Page;
