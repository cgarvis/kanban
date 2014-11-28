/** @jsx React.DOM */
var React = require('react');

var Task = require('./task');

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = React.createClass({
  propTypes: {
    list: React.PropTypes.string.isRequired,
    tasks: React.PropTypes.array.isRequired
  },

  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return (
        <li key={task.id}>
          <Task task={task} key={task.id} />
        </li>
      )
    }, this);

    return (
      <ul className="list">{tasks}</ul>
    )
  },
});

module.exports = List;
