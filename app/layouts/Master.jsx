
'use strict';

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var Master = React.createClass({
    render: function() {
        var data = this.props.data || {};
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

                </head>

                <body>
                    <ul className="mainMenu">
                        <li className="mainMenu-toggleContentMenu">CM</li>
                        <li className="mainMenu-title">ProtonCMS</li>
                        <li className="mainMenu-userWidget">Log in</li>
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
