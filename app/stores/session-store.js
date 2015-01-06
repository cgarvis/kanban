var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _loggedIn = false, _user = {};

function login(authenticatedUser) {
  _loggedIn = true;
  _user = authenticatedUser;
}

function logout() {
  _loggedIn = false;
  _user = {};
}

var SessionStore = createStore({
  getLoggedInStatus() {
    return _loggedIn;
  },

  getUser() {
    return _user;
  }
});

SessionStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGGED_IN:
      login(action.user);
      SessionStore.emitChange();
      break;
    case ActionTypes.LOGGED_OUT:
      logout();
      SessionStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = SessionStore;

