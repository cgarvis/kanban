/** @jsx React.DOM */
var React = require('react');

var Task = React.createClass({
  propTypes: {
    isArchivable: React.PropTypes.bool,
    task: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  },

  render: function() {
    var type = this.props.task.type || 'default';

    var className = "card " + type;

    return (
      <div className={className} onClick={this._handleClick} onTouchEnd={this._handleClick} >
        {this.props.task.task}
      </div>
    )
  },

  _handleClick: function(e) {
    e.preventDefault();

    if(this.props.onClick) {
      this.props.onClick(this.props.task);
    }
  },
});

module.exports = Task;

