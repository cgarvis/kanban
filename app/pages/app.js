var React = require('react');
var {RouteHandler} = require('react-router');

var ListenToStore = require('../utils/listen-to-store');
var SessionStore = require('../stores/session-store');

var App = React.createClass({
  mixins: [ ListenToStore ],

  stores: [ SessionStore ],

  getInitialState() {
    return {
      isLoggedIn: false
    };
  },

  getStateFromStore() {
    this.setState({
      isLoggedIn: SessionStore.getLoggedInStatus()
    });
  },

  render() {
    return <RouteHandler {...this.props} />
  },
});


module.exports = App;
