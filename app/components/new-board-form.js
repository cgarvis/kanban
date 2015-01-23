var React = require('react/addons');

var BoardActionCreators = require('../actions/board-action-creators');

var InputField = require('./input-field');
var OrganizationDropDown = require('./organization-drop-down');

var NewBoardForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
  },

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      name: '',
      organizationId: '',
    };
  },

  _submit(e) {
    e.preventDefault();

    BoardActionCreators.createBoard(this.state.organizationId, this.state.name);

    if(this.props.onSubmit) {
      this.props.onSubmit.call();
    }
  },

  render() {
    return (
      <form onSubmit={this._submit}>
        <OrganizationDropDown valueLink={this.linkState('organizationId')} />

        <InputField
          type="text"
          label="Board Name"
          valueLink={this.linkState('name')}
        />

        <button className="btn btn-default" type="submit">Create</button>
      </form>
    )
  }
});

module.exports = NewBoardForm;
