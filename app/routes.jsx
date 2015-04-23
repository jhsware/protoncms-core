'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    MasterTemplate = require('./layouts/Master');

module.exports = (
    <Route name="app" path="/" handler={require('./layouts/Master')}>
        <DefaultRoute handler={require('./pages/list')} />
    
        <Route path="/:parentId" handler={require('./pages/list')} />
        <Route name="editObject" path="/:parentId/:objectId/edit" handler={require('./pages/edit')} />
        <Route name="createObject" path="/:parentId/:objectType/create" handler={require('./pages/create')} />

        <NotFoundRoute handler={require('./pages/not_found')} />
    </Route>
);
