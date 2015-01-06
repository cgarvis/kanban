var React = require('react');
var {RouteHandler} = require('react-router');

var Navbar = require('./navbar');

var ListenToStore = require('../utils/listen-to-store');
var Authentication = require('../utils/authentication-mixin');

var SessionStore = require('../stores/session-store');

var Layout = React.createClass({
  mixins: [ Authentication, ListenToStore ],

  stores: [ SessionStore ],

  getInitialState() {
    return {
      user: {}
    };
  },

  getStateFromStore() {
    this.setState({
      user: SessionStore.getUser()
    });
  },

  render() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <div className="container" id="main">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    )
  }
});

module.exports = Layout;
