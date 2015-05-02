'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var createAdapter = require('component-registry').createAdapter;
var createUtility = require('component-registry').createUtility;
var ITopMenuUserWidget = require('../../interfaces').ITopMenuUserWidget;
var IUser = require('../../interfaces').IUser;

var Login = createUtility({
    implements: ITopMenuUserWidget,
    
    ReactComponent: React.createClass({
        
        contextTypes: {
             currentUser: React.PropTypes.object
        },
    
        render: function () {
            return (
                <li className="mainMenu-item mainMenu-userWidget">
                    <Link className="mainMenu-itemLink" to="/users/login">Login</Link>
                </li>
            );
        }
    })
});

global.utilityRegistry.registerUtility(Login)

var UserWidget = createAdapter({
    implements: ITopMenuUserWidget,
    adapts: IUser,
    
    ReactComponent: React.createClass({
        
        contextTypes: {
             currentUser: React.PropTypes.object
        },
    
        render: function () {
            
            var currentUser = this.context.currentUser;
            
            return (
                <li className="mainMenu-item mainMenu-userWidget">
                    <Link className="mainMenu-itemLink" to="editObject" params={{parentId: currentUser._type, objectId: currentUser._id}}><span className="mainMenu-Username">{currentUser.title}</span></Link>
                    <Link className="mainMenu-itemLink" to="/users/logout">Logout</Link>
                </li>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(UserWidget)
    