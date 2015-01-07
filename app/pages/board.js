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
      tasks: BoardStore.getAllForCurrentBoard(),
      selectedTask: BoardStore.getSelectedTask()
    });
  },

  componentWillMount: function() {
    BoardActionCreators.selectBoard(this.props.params.boardId);
  },

  render: function() {
    return (
      <section>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-sm-offset-8">
            <form id="new-task-form" className="form-inline pull-right" onSubmit={this.handleSubmit}>
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

    BoardActionCreators.createTask(this.props.params.boardId, task);
  },

  _selectTask: function(task) {
    this.transitionTo('task-details', {boardId: this.props.params.boardId, taskId: task.id});
  },
});

module.exports = Board;
