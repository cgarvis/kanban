var React = require('react');

var Link = require('react-router').Link;

var ProjectsStore = require('../stores/projects-store');

var Projects = React.createClass({
  getInitialState: function() {
    return {
      projects: []
    };
  },

  getStateFromStore: function() {
    this.setState({
      projects: ProjectsStore.getAll()
    });
  },

  componentDidMount: function() {
    ProjectsStore.addChangeListener(this._onChange);
    this.getStateFromStore();
  },

  componentWillUnmount: function() {
    ProjectsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var projectList = this.state.projects.map(function(project) {
      return (<li className="well"><Link to="board" params={{projectId: project.id}}>{project.name}</Link></li>)
    });

    return (
      <div className="row">
        <h1 className="col-xs-12">Projects</h1>

        <div className="col-xs-12">
          <ul id="project-list" className="list-unstyled">
            { projectList }
          </ul>
        </div>
      </div>
    )
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.getStateFromStore();
  }
});

module.exports = Projects;
