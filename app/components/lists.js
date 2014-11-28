/** @jsx React.DOM */
var React = require('react');

var List = require('./list');

var Lists = React.createClass({
  propTypes: {
    lists: React.PropTypes.array.isRequired,
    tasks: React.PropTypes.array.isRequired
  },

  render: function() {
    var lists = this.props.lists.map(function(list) {
      var tasks = this.props.tasks.filter(function(task) {
        return task.state === list;
      }, this);


      return (
        <div className="col-sm-3" key={list}>
          <h2 className="text-center">{list}</h2>
          <List list={list} tasks={tasks} />
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
