var React = require('react');
var Router = require('react-router');

// Router Stuff
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Layout = require('./components/layout');

// Pages
var App = require('./pages/app');
var Board = require('./pages/board');
var Login = require('./pages/login');
var NewBoard = require('./pages/new-board');
var Boards = require('./pages/boards');
var Organizations = require('./pages/organizations');
var Organization = require('./pages/organization');
var NewOrganization = require('./pages/new-organization');
var TaskDetails = require('./pages/task-details');

var NotFound = require('./pages/not-found');

var routes = (
  <Route handler={App}>
    <Route handler={Layout}>
      <Route name="new-board" path="boards/new" handler={NewBoard} />
      <Route name="board" path="boards/:boardId" handler={Board} />
      <Route name="boards" handler={Boards} />
      <Route name="task-details" path="boards/:boardId/task/:taskId" handler={TaskDetails} />

      <Route name="organization" path="organizations/:organizationId" handler={Organization} />
      <Route name="organizations" handler={Organizations} />
      <Route name="new-organization" handler={NewOrganization} />
      <DefaultRoute handler={Boards}/>
    </Route>

    <Route name="login" path="/login" handler={Login} />
    <NotFoundRoute handler={NotFound} />
  </Route>
)

module.exports = routes;
