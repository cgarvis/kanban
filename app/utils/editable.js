function supressEvent (event) {
  event.preventDefault();
  event.stopPropagation();
}

module.exports = {
  getDefaultProps () {
    return {
      editing: false
    };
  },

  getInitialState () {
    return {
      editing: this.props.editing,
      value: this.props.value
    };
  },

  /* Private APIs
   *
   */
  handleClick (event) {
    supressEvent(event);
    this.setState({
      editing: true
    });
  },

  handleChange (event) {
    supressEvent(event);
    this.setState({
      value: event.target.value
    });
  },

  handleBlur (event) {
    supressEvent(event);
    this.setState({
      editing: false
    });
  }
};
