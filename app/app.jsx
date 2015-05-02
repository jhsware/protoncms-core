
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
var network = require('./network');

// Register some utilities
require('./layouts/AutoForm');

function renderApp(req, res, next) {
    
    Router.run(routes, req.path, function (Handler, state) {
        var dataFetchers = state.routes.filter(function (route) {
            return route.handler.fetchData;
        });
        
        // Pass the session id with params so we can set it to
        // retrieve the session even with server side API calls
        // (first server side render)
        state.params.sessionId = res.req.sessionID;
        
        if (dataFetchers.length > 0) {
            var routeName = dataFetchers[0].name;
            var fetchData = dataFetchers[0].handler.fetchData;
            var routePath = dataFetchers[0].path;

            fetchData(state.params, function (err, result) {
                if (err) {
                    // Pass error object to
                    console.log("[APP] We got an error!");
                    if (err && err.message) {
                        console.log(err && err.message);
                    }
                    // TODO: Show error modal
                    //return alert("We got an error! See console");
                }
                
                try {
                    var html = React.renderToString(<Handler 
                                                        params={state.params}
                                                        serverMessage={result.message} 
                                                        currentUser={result.currentUser}
                                                        data={result.data} />);
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
    
    var currentUser;
    
    // Perform routing
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        var dataFetchers = state.routes.filter(function (route) {
            return route.handler.fetchData;
        });

        if (dataFetchers.length > 0) {
            var routeName = dataFetchers[0].name;
            var fetchData = dataFetchers[0].handler.fetchData;
            
            if (typeof global.serverData !== 'undefined') {
                
                // We got data from the server so we use it instead of making a new call to
                // the api
                var result = network.deserialize(window.serverData);

                // Store current user in cache variable
                currentUser = result.currentUser;
                
                // Need to clear the data so we make proper calls on next client render
                global.serverData = undefined;
                
                try {
                    return React.render(<Handler 
                                            params={state.params}
                                            serverMessage={result.message} 
                                            currentUser={result.currentUser}
                                            data={result.data} />, document);
                    
                } catch (e) {
                    console.log("[APP] error when rendering view");
                    console.error(e.stack);
                }
            } else {
                // When running on client we make proper API-calls
                fetchData(state.params, function (err, result) {
                    if (err) {
                        // Pass error object to
                        console.log("[APP] We got an error!");
                        if (err && err.message) {
                            console.log(err && err.message);
                        }
                        // TODO: Show error modal
                        //return alert("We got an error! See console");
                        result.message = "We got an error!";
                    }
                    // All is ok, just render the page
                    
                    // But first add current user if the result doesn't contain it
                    // unless we get a logout property. If currentUser is passed, 
                    // update the currentUser cache object
                    if (!result.hasOwnProperty('currentUser') && !result.logout) {
                        result.currentUser = currentUser;
                    } else {
                        currentUser = result.currentUser;
                    }
                    
                    try {
                        return React.render(<Handler 
                                                params={state.params} 
                                                serverMessage={result.message} 
                                                currentUser={result.currentUser} 
                                                data={result.data} />, document);
                    
                    } catch (e) {
                        console.log("[APP] error when rendering view");
                        console.error(e.stack);
                    }
                    
                });                
            }

        } else {
            return React.render(<Handler params={state.params} />, document);
        };
    });
};

module.exports.renderApp = renderApp;
