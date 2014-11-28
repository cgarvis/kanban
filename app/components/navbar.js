var React = require('react');

var Link = require('react-router').Link;

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-cubes" />
              Kanban
            </a>
          </div>

          <ul className="nav navbar-nav">
            <li><Link to="projects">Projects</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;
