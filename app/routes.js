var React = require('react');
var Router = require('react-router');

// Router Stuff
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Layout = require('./components/layout');

var App = React.createClass({
  render() {
    return (
      <Layout />
    )
  }
});

// Pages
var Projects = require('./pages/projects');
var NewProject = require('./pages/new-project');
var Board = require('./pages/board');
var TaskDetails = require('./pages/task-details');
var NotFound = require('./pages/not-found');

var routes = (
  <Route handler={App}>
    <Route name="projects" handler={Projects} />
    <Route name="new-project" path="projects/new" handler={NewProject} />
    <Route name="board" path="projects/:projectId/board" handler={Board} />
    <Route name="task-details" path="projects/:projectId/task/:taskId" handler={TaskDetails} />
    <DefaultRoute handler={Projects}/>

    <NotFoundRoute handler={NotFound} />
  </Route>
)

module.exports = routes;
