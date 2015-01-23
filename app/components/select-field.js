var React = require('react/addons');

var SelectField = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    options: React.PropTypes.array.isRequired,
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

  mixins: [React.addons.LinkedStateMixin],

  getValueLink: function(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  componentWillReceiveProps(nextProps) {
    var valueLink = this.getValueLink(this.props);
    var options = nextProps.options;

    if(!valueLink.value && options.length) {
      valueLink.requestChange(options[0].value);
    }
  },

  _onChange(evt) {
    this.getValueLink(this.props).requestChange(evt.target.value);
  },

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select
          className="form-control"
          value={this.getValueLink(this.props).value}
          onChange={this._onChange}
        >
        {this.props.options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
        </select>
      </div>
    )
  }
});

module.exports = SelectField;
