var React = require('react/addons');

var TextField = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      requestChange: React.PropTypes.func.isRequired
    })
  },

  getDefaultProps() {
    var emptyFunc = function() {
      return;
    };

    return {
      label: '',
      type: 'text',
      value: '',
      onChange: emptyFunc,
      valueLink: null
    }
  },

  getValueLink: function(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  mixins: [React.addons.LinkedStateMixin],

  _onChange(evt) {
    this.getValueLink(this.props).requestChange(evt.target.value);
  },

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          className="form-control"
          value={this.getValueLink(this.props).value}
          onChange={this._onChange}
        />
      </div>
    )
  }
});

module.exports = FormField;

