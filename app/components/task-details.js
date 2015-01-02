var React = require('react');
var Navigation = require('react-router').Navigation;

var TaskActionCreators = require('../actions/task-action-creators');
var Dropdown = require('../components/dropdown');
var SimpleEditable = require('../utils/simple-editable');

var TaskDetails = React.createClass({
  mixins: [Navigation],

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

  onSaveEditable (key, value) {
    var task = this.props.task;
    task[key] = value;
    TaskActionCreators.save(task);
  },

  render: function() {
    var task = this.props.task;

    var items = [
      {key: 'task-remove', title: 'Delete', action: this._remove}
    ];

    var editTitle = {
      className: "form-control",
      onChange: this.onSaveEditable.bind(this, "task")
    }

    var description = task.description || '';

    return (
      <div className="task-details">
        <div className="row">
          <header className="col-xs-12 col-sm-10">
            <SimpleEditable
              displayComponentClass={React.DOM.h1}
              edit={editTitle}
              value={task.task}>
              {task.task}
            </SimpleEditable>
          </header>

          <div className="actions col-sm-2">
            <Dropdown title="..." items={items} />
          </div>
        </div>

        <div class="col-xs-12 col-sm-12">
          <header>
            <h2>Description</h2>
          </header>
          {description.split("\n").map(p => <p>{p}</p>)}
        </div>
      </div>
    )
  },

  _remove: function() {
    TaskActionCreators.remove(this.props.task);
    this.transitionTo('board', {projectId: this.props.task.projectId});
  }
});

module.exports = TaskDetails;
