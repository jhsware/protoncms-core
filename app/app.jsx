
'use strict';

/*
    Create the global component registry first because it is used everywhere!!!
*/    
if (!global.utilityRegistry) {
    console.log('[App] Creating component utility registry');
    var UtilityRegistry = require('component-registry').UtilityRegistry;
    global.utilityRegistry = new UtilityRegistry();
}
if (!global.adapterRegistry) {
    console.log('[App] Creating component adapter registry');
    var AdapterRegistry = require('component-registry').AdapterRegistry;
    global.adapterRegistry = new AdapterRegistry();
}
/*
    /END COMPONENT REGISTRY/
*/


var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Register all our input field widgets
// Change this to override
require('schema-react-formlib').registerAllWidgets({
    adapterRegistry: global.adapterRegistry,
    utilityRegistry: global.utilityRegistry
});

// Register dataFetchers
require('./network');

// Register some utilities
require('./layouts/AutoForm');

function renderApp(req, res, next) {
    // TODO: Get current user (in window render too!)
    
    Router.run(routes, req.path, function (Handler, state) {
        var dataFetchers = state.routes.filter(function (route) {
            return route.handler.fetchData;
        });

        if (dataFetchers.length > 0) {
            var routeName = dataFetchers[0].name;
            var fetchData = dataFetchers[0].handler.fetchData;
            var routePath = dataFetchers[0].path;

            fetchData(state.params, function (err, result) {
                if (err || result.status != 200) {
                    // Allow mounted error handler in server.js handle this
                    console.log("[APP] got an error");
                    console.log(err);
                    return next(err);
                }
                
                try {
                    var html = React.renderToString(<Handler params={state.params} data={result.body} />);
                } catch (e) {
                    console.log("[APP] error when rendering view");
                    console.error(e);
                    var html = "There was an error rendering this view :( check the console for more info!";
                }
                return res.send('<!doctype html>\n' + html);
            });
        } else {
            var html = React.renderToString(<Handler params={state.params} />);
            return res.send('<!doctype html>\n' + html);
        };
    });
}

if (typeof window !== 'undefined') {
    // TODO: Get current user (in server render too!)

    // Perform routing
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        var dataFetchers = state.routes.filter(function (route) {
            return route.handler.fetchData;
        });

        if (dataFetchers.length > 0) {
            var routeName = dataFetchers[0].name;
            var fetchData = dataFetchers[0].handler.fetchData;

            fetchData(state.params, function (err, result) {
                if (err || result.status != 200) {
                    // Pass error object to
                    console.log("[APP] We got an error!");
                    // TODO: Show error modal
                    //return alert("We got an error! See console");
                } else {
                    // All is ok, just render the page
                    try {
                        return React.render(<Handler params={state.params} data={result.body} />, document);
                    } catch (e) {
                        console.log("[APP] error when rendering view");
                        console.error(e.stack);
                    }
                    
                }
            });
        } else {
            return React.render(<Handler params={state.params} />, document);
        };
    });
};

module.exports.renderApp = renderApp;
