/** @jsx React.DOM */
var React = require('react');

var Task = React.createClass({
  propTypes: {
    isArchivable: React.PropTypes.bool,
    task: React.PropTypes.object.isRequired
  },
  render: function() {
    var type = this.props.task.type || 'default';

    var className = "card " + type;

    return (
      <div className={className}>
        {this.props.task.task}
      </div>
    )
  }
});

module.exports = Task;

