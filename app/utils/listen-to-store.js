var ListenToStore = {
  componentDidMount: function() {
    if(!this.stores) {
      console.warn('Stores is not set');
      return;
    }

    this.stores.forEach(function(store) {
      store.addChangeListener(this._onChange);
    }, this);
    this.getStateFromStore();
  },

  componentWillUnmount: function() {
    this.stores.forEach(function(store) {
      store.removeChangeListener(this._onChange);
    }, this);
  },

  _onChange: function() {
    this.getStateFromStore();
  }
};

module.exports = ListenToStore;
