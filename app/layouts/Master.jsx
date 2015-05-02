
'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

// NOTE: This is using https://github.com/M6Web/react-modal/network
// But more activity on https://github.com/rackt/react-modal however that one is
// currently not server side rendering compatible
// TODO: Switch to working version from rackt when available
var Modal = require('react-modal');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var Button = require('react-bootstrap').Button;

var ITopMenuUserWidget = require('../interfaces').ITopMenuUserWidget;
require('./topMenu/UserWidget');

var Master = React.createClass({
    
    childContextTypes: {
         currentUser: React.PropTypes.object
    },
    
    getChildContext: function () {
        var user = this.props.currentUser;
        return {
            currentUser: user
        };
    },
    getInitialState: function () {
        return {
            serverDataRead: false,
            mountModal: false,
            showModal: false
        }
    },
    
    componentDidMount: function () {
        var appElement = document.getElementById('modal');

        Modal.setAppElement(appElement);
        
        
        global.initialServerState = global.serverData;
        var state = this.state;
        state.serverDataRead = true;
        state.mountModal = true;
        state.showModal = typeof this.props.message !== "undefined";
        return this.setState(state);
    },
    
    componentWillReceiveProps: function (nextProps) {
        var state = this.state;
        state.showModal = typeof nextProps.serverMessage !== "undefined";
        this.setState(state);
    },
    
    closeModal: function (e) {
        var state = this.state;
        state.showModal = false;
        this.setState(state);        
    },
    
    render: function() {
        var data = this.props.data || {};
        
        if (!this.state.serverDataRead) {
            var tmp = JSON.stringify({
                currentUser: this.props.currentUser,
                data: this.props.data
            });
            var serverData = "var serverData = " + tmp + ";";            
        } else {
            var serverData = "// Data has been picked up by client"
        };
        
        if (typeof this.props.currentUser !== "undefined") {
            var UserWidget = global.adapterRegistry.getAdapter(this.props.currentUser, ITopMenuUserWidget).ReactComponent;
        } else {
            var UserWidget = global.utilityRegistry.getUtility(ITopMenuUserWidget).ReactComponent;
        }
        
        if (this.state.mountModal) {
            var ModalWidget = (<Modal
                isOpen={this.state.showModal}
                onRequestClose={this.closeModal}
                closeTimeoutMS={0}>
                    <h1>Server Error!</h1>
                    <p>{this.props.serverMessage}</p>
                    <Button 
                        bsStyle='success'
                        bsSize='large'
                        block
                        onClick={this.closeModal}>Ok</Button>
            </Modal>)
        } else {
            var ModalWidget;
        }
        
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <title>ProtonCMS</title>
                    <meta name="description" content={data.description || ''} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" />

                    <link rel="stylesheet" href="/assets/css/app.css" />
            
                    <script dangerouslySetInnerHTML={{__html: serverData}}></script>

                </head>

                <body>
            
                    <div id="modal" className="padbox">
                        {ModalWidget}
                    </div>
                    
                    <Navbar brand='ProtonCMS' className="mainMenu" inverse toggleNavKey={0}>
            
                        <Nav right eventKey={0}>
                            <UserWidget />
                        </Nav>
            
                    </Navbar>
                    <ul className="contentMenu">
                        <li className="contentMenu-item">
                            <Link className="contentMenu-itemLink" to="/users">Users</Link>
                        </li>
                        <li className="contentMenu-item">
                            <Link className="contentMenu-itemLink" to="/content">Content</Link>
                        </li>
                        <li className="contentMenu-item">
                            <Link className="contentMenu-itemLink" to="/settings">Settings</Link>
                        </li>
                    </ul>
                    <div className="page">
                        <RouteHandler {...this.props} />
                    </div>

                    <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
                    <script src="/assets/js/app.js" />
                </body>
            </html>
        );
    }
});

module.exports = Master;
