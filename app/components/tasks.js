/** @jsx React.DOM */
var React = require('react');

var Task = require('./task');

function createTask(task) {
  return (
    <Task task={task} key={task.id} />
  )
}

var Tasks = React.createClass({
  propTypes: {
    tasks: React.PropTypes.array.isRequired
  },
  render: function() {
    var tasks = this.props.tasks.map(createTask);

    return (
      <div className="task-list">
        {tasks}
      </div>
    )
  }
});

module.exports = Tasks;
