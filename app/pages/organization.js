var React = require('react');

var OrganizationsStore = require('../stores/organizations-store');
var ListenToStore = require('../utils/listen-to-store');

var OrganizationPage = React.createClass({
  mixins: [ListenToStore],

  getInitialState: function() {
    return {
      organization: {},
    };
  },

  stores: [OrganizationsStore],

  getStateFromStore: function() {
    this.setState({
      organization: OrganizationsStore.get(this.props.params.organizationId)
    });
  },

  render: function() {
    return (
      <section>
        <h1>{this.state.organization.name}</h1>
      </section>
    )
  }
});

module.exports = OrganizationPage;
