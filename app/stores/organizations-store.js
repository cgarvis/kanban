var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _organizations = [];

function loadRawData(rawData) {
  _organizations[rawData.id] = rawData;
}

var OrganizationsStore = createStore({
  get(id) {
    return _organizations[id] || {};
  },

  getAll() {
    return Object.keys(_organizations).map((key) => {
      return _organizations[key];
    });
  }
});

OrganizationsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_ORGANIZATION:
      loadRawData(action.rawData);
      OrganizationsStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = OrganizationsStore;
