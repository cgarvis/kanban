var React = require('react');

var BoardActionCreators = require('../actions/board-action-creators');
var BoardStore = require('../stores/board-store');

var Lists = require('../components/lists');

var Board = React.createClass({
  getInitialState: function() {
    return {
      lists: [],
      tasks: []
    };
  },

  getStateFromStore: function() {
    this.setState({
      lists: BoardStore.getAllLists(),
      tasks: BoardStore.getAllForCurrentProject()
    });
  },

  componentWillMount: function() {
    BoardActionCreators.selectProject(this.props.params.projectId);
  },

  componentDidMount: function() {
    BoardStore.addChangeListener(this._onChange);
    this.getStateFromStore();
  },

  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this._onChange);
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

        <Lists lists={this.state.lists} tasks={this.state.tasks} />
      </section>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var task = this.refs.task.getDOMNode().value.trim();
    this.refs.task.getDOMNode().value = '';

    BoardActionCreators.createTask(this.props.params.projectId, task);
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.getStateFromStore();
  }
});

module.exports = Board;

