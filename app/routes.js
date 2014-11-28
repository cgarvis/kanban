var React = require('react');
var Router = require('react-router');

// Router Stuff
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Handlers
var Layout = require('./components/layout');
var Projects = require('./pages/projects');
var Board = require('./pages/board');
var NotFound = require('./pages/not-found');

var routes = (
  <Routes scrollBehavior="scrollToTop">
    <Route handler={Layout}>
      <Route name="projects" handler={Projects} />
      <Route name="board" path="projects/:projectId/board" handler={Board} />
      <DefaultRoute handler={Projects}/>
    </Route>

    <NotFoundRoute handler={NotFound} />
  </Routes>
)

module.exports = routes;
