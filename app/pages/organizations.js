var React = require('react');
var {Link} = require('react-router');

var OrganizationsStore = require('../stores/organizations-store');

var ListenToStore = require('../utils/listen-to-store');

var Organizations = React.createClass({
  mixins: [ListenToStore],

  stores: [OrganizationsStore],

  getInitialState: function() {
    return {
      organizations: []
    };
  },

  getStateFromStore: function() {
    this.setState({
      organizations: OrganizationsStore.getAll()
    });
  },

  render: function() {
    return (
      <div className="row">
        <h1 className="col-xs-10">Organizations</h1>
        <div className="col-xs-2">
          <Link to="new-organization" className="btn btn-link pull-right">Add organizations</Link>
        </div>

        <div className="col-xs-12">
          <div id="organization-list" className="row">
            { this.state.organizations.map(organization => {
              return (
                <div className="col-xs-12 col-sm-4 col-md-3" key={organization.id}>
                  <div className="well">
                    <Link to="organization" params={{organizationId: organization.id}}>{organization.name}</Link>
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

module.exports = Organizations;
