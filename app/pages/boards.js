var React = require('react');

var Link = require('react-router').Link;

var BoardsStore = require('../stores/boards-store');

var ListenToStore = require('../utils/listen-to-store');

var Boards = React.createClass({
  mixins: [ListenToStore],

  stores: [BoardsStore],

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

  render: function() {
    return (
      <div className="row">
        <h1 className="col-xs-10">Boards</h1>
        <div className="col-xs-2">
          <Link to="new-board" className="btn btn-link pull-right"> Add board</Link>
        </div>

        <div className="col-xs-12">
          <div id="board-list" className="row">
            { this.state.boards.map(board => {
              return (
                <div className="col-xs-12 col-sm-4 col-md-3" key={board.id}>
                  <div className="well">
                    <Link to="board" params={{boardId: board.id}}>{board.name}</Link>
                  </div>
                </div>
              )
            }) }
          </div>
        </div>
      </div>
    )
  },
});

module.exports = Boards;
