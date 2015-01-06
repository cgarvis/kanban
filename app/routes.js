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
var NewProject = require('./pages/new-project');
var Projects = require('./pages/projects');
var TaskDetails = require('./pages/task-details');

var NotFound = require('./pages/not-found');


var routes = (
  <Route handler={App}>
    <Route handler={Layout}>
      <Route name="board" path="projects/:projectId/board" handler={Board} />
      <Route name="new-project" path="projects/new" handler={NewProject} />
      <Route name="projects" handler={Projects} />
      <Route name="task-details" path="projects/:projectId/task/:taskId" handler={TaskDetails} />
      <DefaultRoute handler={Projects}/>
    </Route>

    <Route name="login" path="/login" handler={Login} />
    <NotFoundRoute handler={NotFound} />
  </Route>
)

module.exports = routes;
