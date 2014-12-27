var React = require('react');
var AppBar = require('material.react').AppBar;

var Layout = React.createClass({
  getDefaultProps: function() {
    return {
      title: 'Kanban'
    };
  },
  render: function() {
    return (
      <div>
        <AppBar title={this.props.title} showNavToggle={true}></AppBar>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Layout;
