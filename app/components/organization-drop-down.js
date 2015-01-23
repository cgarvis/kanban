var React = require('react');

var SelectField = require('./select-field');
var OrganizationsStore = require('../stores/organizations-store');

var ListenToStore = require('../utils/listen-to-store');

var OrganizationDropDown = React.createClass({
  propTypes: {
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      requestChange: React.PropTypes.func.isRequired
    })
  },

  mixins: [ListenToStore],

  stores: [OrganizationsStore],

  getInitialState() {
    return {
      organizations: []
    };
  },

  getStateFromStore() {
    this.setState({
      organizations: OrganizationsStore.getAll()
    });
  },

  render() {
    var options = this.state.organizations.map(org => {
      return {label: org.name, value: org.id}
    });

    return (
      <SelectField
        label="Organization"
        options={options}
        valueLink={this.props.valueLink}
      />
    )
  }
});

module.exports = OrganizationDropDown;
