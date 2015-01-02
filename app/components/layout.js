var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Navbar = require('./navbar');

var Layout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <div className="container" id="main">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Layout;
