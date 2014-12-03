var React = require('react');
var AppBar = require('material.react').AppBar;

var Layout = React.createClass({
  render: function() {
    return (
      <div>
        <AppBar title="Kanban" showNavToggle={true}></AppBar>
        <div className="container-fluid">
          <this.props.activeRouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Layout;
