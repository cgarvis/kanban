var React = require('react');

var Layout = require('../components/layout');
var List = require('material.react').List;
var Tile = require('material.react').Tile;

var Link = require('react-router').Link;

var ProjectsStore = require('../stores/projects-store');

var ProjectList = React.createClass({
  propTypes: {
    projects: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      projects: []
    };
  },

  render: function() {
    var projects = this.props.projects.map(function(project) {
      return <Tile key={project.id}>{project.name}</Tile>
    });

    var lists = []

    lists.push(<List><Tile>EventCollab</Tile><Tile>Peach</Tile></List>)

    lists.push(<List>{projects}</List>)

    return (
      <List>
        {this.props.projects.map(function(project) {
          return <Tile key={project.id}>{project.name}</Tile>
        })}
      </List>
    )
  }
});

var Projects = React.createClass({
  getInitialState: function() {
    return {
      projects: []
    };
  },

  getStateFromStore: function() {
    var changes = {
      projects: ProjectsStore.getAll()
    };
    this.replaceState(changes);
  },

  componentDidMount: function() {
    ProjectsStore.addChangeListener(this._onChange);
    this.getStateFromStore();
  },

  componentWillUnmount: function() {
    ProjectsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <Layout title="Projects">
        <div className="row">
          <ProjectList projects={this.state.projects} />
        </div>
      </Layout>
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
