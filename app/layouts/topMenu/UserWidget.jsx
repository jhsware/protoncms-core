'use strict';

var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler;
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var createAdapter = require('component-registry').createAdapter;
var createUtility = require('component-registry').createUtility;
var ITopMenuUserWidget = require('../../interfaces').ITopMenuUserWidget;
var IUser = require('../../interfaces').IUser;

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var MenuItemLink = require('react-router-bootstrap').MenuItemLink;
var NavItemLink = require('react-router-bootstrap').NavItemLink;

var Login = createUtility({
    implements: ITopMenuUserWidget,
    
    ReactComponent: React.createClass({
        
        contextTypes: {
             currentUser: React.PropTypes.object
        },
    
        render: function () {
            return (
                <NavItemLink eventKey={1} to="/users/login">Login</NavItemLink>
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
    
        getInitialState: function () {
            return {
                userMenuOpen: false
            }
        },

        toggleMenu: function (e) {
            e.preventDefault();
            var state = this.state;
            state.userMenuOpen = !state.userMenuOpen;
            return this.setState(state);
        },
    
        render: function () {
            
            var currentUser = this.context.currentUser;
            
            var cx = React.addons.classSet;
        
            var userMenuCls = {
                dropdown: true,
                open: this.state.userMenuOpen
            };
            
            return (
                
                <li className={cx(userMenuCls)}>
                    <a className="dropdown-toggle" type="button" 
                       onClick={this.toggleMenu} 
                       href="toggle menu"
                       role="button">
                        <span>{currentUser.title}</span>
                        <span> </span>
                        <span className="caret"></span>
                    </a>
                
                    <ul className="dropdown-menu" role="menu">
                        <li role="presentation">
                            <Link tabIndex="-1" to="editObject" params={{parentId: currentUser._type, objectId: currentUser._id}}>Edit Profile</Link>
                        </li>
                        <li role="presentation" className="divider"></li>
                        <li className="" role="presentation">
                            <Link tabIndex="-1" to="/users/logout">Logout</Link>
                        </li>
                    </ul>
                </li>
            );
        }
    })
});

global.adapterRegistry.registerAdapter(UserWidget)

/*

    <DropdownButton eventKey={3} title={currentUser.title}>

        <MenuItemLink eventKey='1' to="editObject" params={{parentId: currentUser._type, objectId: currentUser._id}}>Edit profile</MenuItemLink>
        <MenuItem divider />
        <MenuItemLink eventKey='2' to="/users/logout">Logout</MenuItemLink>
    </DropdownButton>

*/