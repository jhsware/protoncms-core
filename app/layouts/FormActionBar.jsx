'use strict';
var React = require('react/addons');
var $ = require('jquery');


var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var FormActionBar = React.createClass({
    
    getInitialState: function () {
        var state = {
            stickToBottom: false
        };
        return state;
    },
    
    onScroll: function () {
        var $el = $(this.refs['theBar'].getDOMNode());
        var barBottom = $el.offset().top + $el.outerHeight();
        
        var state = this.state;
        
        state.stickToBottom = (barBottom - window.scrollY) > window.innerHeight;
        
        this.setState(state);
    },
    
    componentDidMount: function () {
        $(window).on('scroll', this.onScroll.bind(this));
        $(window).on('resize', this.onScroll.bind(this));
        this.onScroll();
    },
    
    componentWillUnmount: function () {
        $(window).off('scroll', this.onScroll.bind(this));
        $(window).off('resize', this.onScroll.bind(this));
    },
    
    render: function() {
        
        var cx = React.addons.classSet;
        
        var stickyActionBarCls = {
            formActionBar: true,
            stickToBottom: true,
            hidden: !this.state.stickToBottom
        };
         
        return (
            <div className="formActionBarsContainer">
                <div ref="theBar" className="formActionBar" >
                
                    <div className="formActionBar-actions">
                        {this.props.children}
                    </div>
                
                </div>
                        
                <div className={cx(stickyActionBarCls)} >
                
                    <div className="formActionBar-actions">
                        {this.props.children}
                    </div>
                
                </div>
            </div>
        );
    }
});

module.exports = FormActionBar

