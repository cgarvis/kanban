var React = require('react');
var Navigation = require('react-router').Navigation;

var NewProjectForm = require('../components/new-project-form');

var NewProject = React.createClass({
  mixins: [Navigation],

  _routeToProjectPage() {
    this.transitionTo('projects');
  },

  render() {
    return (
      <section>
        <div className="row">
          <div className="col-xs-12">
            <h1>New Project</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <NewProjectForm onSubmit={this._routeToProjectPage}/>
          </div>
        </div>
      </section>
    )
  }
});

module.exports =  NewProject;
