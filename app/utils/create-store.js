var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

function createStore(spec) {
  var store = assign({
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, spec, EventEmitter.prototype);

  Object.keys(store).forEach(function(key) {
    var val = store[key];
    if(typeof val === 'function') {
      store[key] = store[key].bind(store);
    }
  });

  store.setMaxListeners(0);
  return store;
}

module.exports = createStore;
