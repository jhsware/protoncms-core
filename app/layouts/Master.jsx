
'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var UserWidget = React.createClass({
    contextTypes: {
         currentUser: React.PropTypes.object
    },
    
    render: function () {
        return (
            <li className="mainMenu-userWidget">
                <Link className="mainMenu-itemLink" to="/users/login">Login</Link>
                {this.context.currentUser.title}
            </li>
        );
    }
});

var Master = React.createClass({
    
    childContextTypes: {
         currentUser: React.PropTypes.object
    },
    
    getChildContext: function () {
        var user = global.currentUser;
        return {
            currentUser: {title: "TEST"}
        };
    },
    getInitialState: function () {
        return {
            serverDataRead: false
        }
    },
    
    componentDidMount: function () {
        window.initialServerState = window.serverData;
        var state = this.state;
        state.serverDataRead = true;
        return this.setState(state);
    },
    
    render: function() {
        var data = this.props.data || {};
        
        if (!this.state.serverDataRead) {
            var tmp = JSON.stringify(this.props.data);
            var serverData = "var serverData = " + tmp + ";";            
        } else {
            var serverData = "// Data has been picked up by client"
        };
        
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
                    <ul className="mainMenu">
                        <li className="mainMenu-toggleContentMenu">CM</li>
                        <li className="mainMenu-title">ProtonCMS</li>
            
                        <UserWidget />
            
                    </ul>
                    <ul className="contentMenu">
                        <li className="contentMenu-item"><Link className="contentMenu-itemLink" to="/users">Users</Link></li>
                        <li className="contentMenu-item"><Link className="contentMenu-itemLink" to="/content">Content</Link></li>
                        <li className="contentMenu-item"><Link className="contentMenu-itemLink" to="/settings">Settings</Link></li>
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
