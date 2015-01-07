var React = require('react');

var Link = require('react-router').Link;

var BoardsStore = require('../stores/boards-store');

var Boards = React.createClass({
  getInitialState: function() {
    return {
      boards: []
    };
  },

  getStateFromStore: function() {
    this.setState({
      boards: BoardsStore.getAll()
    });
  },

  componentDidMount: function() {
    BoardsStore.addChangeListener(this._onChange);
    this.getStateFromStore();
  },

  componentWillUnmount: function() {
    BoardsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var boardList = this.state.boards.map(function(board) {
      return (<li className="well"><Link to="board" params={{boardId: board.id}}>{board.name}</Link></li>)
    });

    return (
      <div className="row">
        <h1 className="col-xs-12 col-sm-10">Boards</h1>
        <div className="col-sm-2">
          <Link to="new-board" className="btn btn-link pull-right">Add board</Link>
        </div>

        <div className="col-xs-12">
          <ul id="board-list" className="list-unstyled">
            { boardList }
          </ul>
        </div>
      </div>
    )
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.getStateFromStore();
  }
});

module.exports = Boards;
