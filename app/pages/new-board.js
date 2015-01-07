var React = require('react');
var Navigation = require('react-router').Navigation;

var NewBoardForm = require('../components/new-board-form');

var NewBoard = React.createClass({
  mixins: [Navigation],

  _routeToBoardPage() {
    this.transitionTo('boards');
  },

  render() {
    return (
      <section>
        <div className="row">
          <div className="col-xs-12">
            <h1>New Board</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <NewBoardForm onSubmit={this._routeToBoardPage}/>
          </div>
        </div>
      </section>
    )
  }
});

module.exports =  NewBoard;
