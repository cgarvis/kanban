var React = require('react');
var Navigation = require('react-router').Navigation;

var BoardActionCreators = require('../actions/board-action-creators');
var BoardsStore = require('../stores/boards-store');

var Lists = require('../components/lists');
var ListenToStore = require('../utils/listen-to-store');

var Board = React.createClass({
  mixins: [ListenToStore, Navigation],

  getInitialState: function() {
    return {
      tasks: [],
    };
  },

  stores: [BoardsStore],

  getStateFromStore: function() {
    this.setState({
      tasks: BoardsStore.getTasks(this.props.params.boardId),
    });
  },

  componentWillMount: function() {
    BoardActionCreators.selectBoard(this.props.params.boardId);
  },

  render: function() {
    return (
      <section>
        <div className="row">
          <form id="new-task-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-sm-12 col-md-10">
                <input className="form-control" type="text" placeholder="New task" ref="task" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-12 col-md-2">
                <button type="submit" className="btn btn-default btn-block">Create</button>
              </div>
            </div>
          </form>
        </div>

        <Lists tasks={this.state.tasks} onTaskClick={this._selectTask}/>
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
