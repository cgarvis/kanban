var React = require('react');

var TasksStore = require('../stores/tasks-store');

var TaskDetails = require('../components/task-details');
var ListenToStore = require('../utils/listen-to-store');

var TaskDetailsPage = React.createClass({
  mixins: [ListenToStore],

  getInitialState: function() {
    return {
      task: null,
    };
  },

  stores: [TasksStore],

  getStateFromStore: function() {
    this.setState({
      task: TasksStore.getById(this.props.params.taskId),
    });
  },

  render: function() {
    var details;
    if(this.state.task) {
      details = <TaskDetails task={this.state.task} />
    }

    return (
      <section>
        <div className="row">
          <div className="col-xs-12">
            {details}
          </div>
        </div>
      </section>
    )
  },
});

module.exports = TaskDetailsPage;
