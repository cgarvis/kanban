/** @jsx React.DOM */
var React = require('react');

var BoardActionCreators = require('../actions/board-action-creators');
var List = require('./list');

var Lists = React.createClass({
  propTypes: {
    lists: React.PropTypes.array.isRequired,
    tasks: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      over: null
    };
  },

  onDragOver: function(list) {
    return () => {
      this.setState({over: list});
    };
  },

  onDrag: function(task) {
    console.log('dragging', task);
    this.setState({dragging: task});
  },

  onDragOut: function() {
    this.setState({over: null})
  },

  move: function() {
    BoardActionCreators.move(this.state.dragging, this.state.over);
    this.setState({dragging: false, over: null});
  },

  render: function() {
    var lists = this.props.lists.map(function(list) {
      var tasks = this.props.tasks.filter(function(task) {
        return task.state === list;
      }, this);

      var className = 'col-sm-3';
      if(this.state.over === list) {
        className += ' drag-over';
      }

      return (
        <div className={className} key={list} onDragOver={this.onDragOver(list)} onDragEnd={this.move}>
          <h2 className="text-center">{list}</h2>
          <List list={list} tasks={tasks} onDrag={this.onDrag} />
        </div>
      )
    }, this);

    return (
      <div id="lists" className="row">
        {lists}
      </div>
    )
  }
});

module.exports = Lists;
