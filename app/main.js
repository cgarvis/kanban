var React = require('react');
var Router = require('react-router');

// React configurations
React.initializeTouchEvents(true);

var Data = require('./data');
Data.init();

var routes = require('./routes');
Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler params={state.params} query={state.query}/>, document.getElementById('react-root'));
});
