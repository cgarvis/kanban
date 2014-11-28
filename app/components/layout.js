var React = require('react');

var Navbar = require('./navbar')

var Layout = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <this.props.activeRouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Layout;
