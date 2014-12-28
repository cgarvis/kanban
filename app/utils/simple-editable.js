var React = require('react/addons');
var {update} = React.addons;

var EditableMixin = require('./editable');

var SimpleEditable = React.createClass({
  displayName: 'SimpleEditable',

  mixins: [EditableMixin],

  getDefaultProps () {
    return {
      editComponentClass: React.DOM.input,
      displayComponentClass: React.DOM.span,
      edit: {},
      display: {}
    };
  },

  _handle_click (event) {
    this.handleClick(event);
  },

  _handle_change (event) {
    this.handleChange(event);
    var {onChange} = this.props.edit;
    if (onChange) {
      onChange(event.target.value);
    }
  },

  _handle_blur (event) {
    this.handleBlur(event);
    var {onBlur} = this.props.edit;
    if (onBlur) {
      onBlur(event.target.value);
    }
  },

  render () {
    var child;
    if (this.state.editing) {
      child = this.props.editComponentClass(update(this.props.edit, {
        $merge: {
          onBlur: this._handle_blur,
          onChange: this._handle_change,
          value: this.state.value
        }
      }));
    } else {
      child = this.props.displayComponentClass(update(this.props.display, {
        $merge: {
          onClick: this._handle_click
        }
      }), this.props.children);
    }
    return child;
  }
});

module.exports = SimpleEditable;
