var React = require('react');
var {Link} = require('react-router');

var AuthActionCreators = require('../actions/auth-action-creators');

var Navbar = React.createClass({
  getInitialState() {
    return {
      isDropDownOpen: false
    };
  },

  logout(evt) {
    evt.preventDefault();
    AuthActionCreators.logout();
  },

  toggleDropDown(evt) {
    evt.preventDefault();

    this.setState({isDropDownOpen: !this.state.isDropDownOpen});
  },

  render() {
    var avatar = this.props.user.avatar || "http://www.themeon.net/nifty/wb/v2-0-1/images/av1.png";

    var dropDownClass = "dropdown" + (this.state.isDropDownOpen ? " open" : "")

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

          <ul className="nav navbar-nav pull-right navbar-top-links">
            <li className={dropDownClass}>
              <a onClick={this.toggleDropDown}>
                <span className="pull-right">
                  <img className="img-user img-circle" src={avatar} />
                </span>
                <div className="username hidden-xs">
                  {this.props.user.displayName}
                </div>
              </a>

              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li role="presentation">
                  <a onClick={this.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;
