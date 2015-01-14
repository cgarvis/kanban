var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _organizations = [];

function loadRawData(rawData) {
  _organizations = [];

  var rawOrganizations = rawData.organizations || {};
  for (var organizationId in rawOrganizations) {
    if (rawOrganizations.hasOwnProperty(organizationId)){
      var rawOrganization = rawOrganizations[organizationId];
      rawOrganization.id = organizationId;
      _organizations.push(rawOrganization);
    }
  }
}

var OrganizationsStore = createStore({
  get(id) {
    return _organizations.find(org => { return org.id === id }) || {};
  },

  getAll() {
    return _organizations;
  }
});

OrganizationsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_DATA:
      loadRawData(action.rawData);
      OrganizationsStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = OrganizationsStore;
