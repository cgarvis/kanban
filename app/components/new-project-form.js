var React = require('react/addons');

var ProjectActionCreators = require('../actions/project-action-creators');

var FormField = require('./form-field');

var NewProjectForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func
  },

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      name: ''
    };
  },

  _submit(e) {
    e.preventDefault();

    ProjectActionCreators.createProject(this.state.name);
    if(this.props.onSubmit) {
      this.props.onSubmit.call();
    }
  },

  render() {
    return (
      <form onSubmit={this._submit}>
        <FormField label="Project Name" valueLink={this.linkState('name')} />

        <button className="btn btn-default" type="submit">Create</button>
      </form>
    )
  }
});

module.exports = NewProjectForm;
