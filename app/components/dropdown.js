var React = require('react');

var Dropdown = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },

  render: function() {
    var items = this.props.items.map(function(item) {
      return (<li key={item.key}><a onClick={item.action}>{item.title}</a></li>)
    }, this);

    var style = "dropdown";
    if(this.state.expanded) {
      style += ' open';
    }

    return (
      <div className={style}>
        <button className="btn btn-default" type="button" aria-haspopup="true" aria-expanded={this.state.expanded} onClick={this._toggleDropDown}>
          {this.props.title}
        </button>

        <ul className="dropdown-menu" role="menu">
          {items}
        </ul>
      </div>
    )
  },

  _toggleDropDown: function() {
    this.setState({expanded: !this.state.expanded});
  }
})

module.exports = Dropdown;
