var React = require('react');
var Navigation = require('react-router').Navigation;

var BoardActionCreators = require('../actions/board-action-creators');
var BoardStore = require('../stores/board-store');

var Lists = require('../components/lists');
var ListenToStore = require('../utils/listen-to-store');

var Board = React.createClass({
  mixins: [ListenToStore, Navigation],

  getInitialState: function() {
    return {
      lists: [],
      tasks: [],
      selectedTask: null,
    };
  },

  stores: [BoardStore],

  getStateFromStore: function() {
    this.setState({
      lists: BoardStore.getAllLists(),
      tasks: BoardStore.getAllForCurrentProject(),
      selectedTask: BoardStore.getSelectedTask()
    });
  },

  componentWillMount: function() {
    BoardActionCreators.selectProject(this.props.params.projectId);
  },

  render: function() {
    return (
      <section>
        <div className="row">
          <h1 className="col-xs-12 col-sm-8">Board</h1>
          <div className="col-xs-12 col-sm-4">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="New task" ref="task" />
              </div>

              <button type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
        </div>

        <Lists lists={this.state.lists} tasks={this.state.tasks} onTaskClick={this._selectTask}/>
      </section>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var task = this.refs.task.getDOMNode().value.trim();
    this.refs.task.getDOMNode().value = '';

    BoardActionCreators.createTask(this.props.params.projectId, task);
  },

  _selectTask: function(task) {
    this.transitionTo('task-details', {projectId: this.props.params.projectId, taskId: task.id});
  },
});

module.exports = Board;

