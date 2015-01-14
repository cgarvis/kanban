var React = require('react');
var {Navigation} = require('react-router');

var NewOrganizationForm = require('../components/new-organization-form');

var NewOrganization = React.createClass({
  mixins: [Navigation],

  _routeToBoardPage() {
    this.transitionTo('organizations');
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
            <NewOrganizationForm onSubmit={this._routeToBoardPage}/>
          </div>
        </div>
      </section>
    )
  }
});

module.exports =  NewOrganization;
