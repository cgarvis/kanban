var React = require('react');

var BoardsStore = require('../stores/boards-store');

var TaskDetails = require('../components/task-details');
var ListenToStore = require('../utils/listen-to-store');

var TaskDetailsPage = React.createClass({
  mixins: [ListenToStore],

  getInitialState: function() {
    return {
      task: null,
    };
  },

  stores: [BoardsStore],

  getStateFromStore: function() {
    this.setState({
      task: BoardsStore.getTask(this.props.params.boardId, this.props.params.taskId),
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
