var React = require('react/addons');

var OrganizationActionCreators = require('../actions/organization-action-creators');

var InputField = require('./input-field');

var NewOrganizationForm = React.createClass({
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

    OrganizationActionCreators.createOrganization(this.state.name);

    if(this.props.onSubmit) {
      this.props.onSubmit.call();
    }
  },

  render() {
    return (
      <form onSubmit={this._submit}>
        <InputField label="Organization Name" valueLink={this.linkState('name')} />

        <button className="btn btn-default" type="submit">Create</button>
      </form>
    )
  }
});

module.exports = NewOrganizationForm;
