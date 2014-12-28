/** @jsx React.DOM */
var React = require('react');

var Task = require('./task');

var List = React.createClass({
  propTypes: {
    list: React.PropTypes.string.isRequired,
    onDrag: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.array.isRequired,
    onTaskClick: React.PropTypes.func
  },

  dragStart: function(task) {
    var onDrag = this.props.onDrag;

    return function() {
      onDrag(task);
    };
  },

  render: function() {
    var tasks = this.props.tasks.map(function(task, i) {
      return (
        <li key={task.id} draggable="true" onDragStart={this.dragStart(task)}>
          <Task task={task} onClick={this.props.onTaskClick} />
        </li>
      )
    }, this);

    return (
      <ul className="list" onDragOver={this.dragOver} onDragEnd={this.moveTask}>{tasks}</ul>
    )
  },
});

module.exports = List;
