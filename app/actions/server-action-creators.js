var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  loggedIn(authenticatedUser) {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGGED_IN,
      user: authenticatedUser
    });

    var router = require('../router');
    router.transitionTo('boards');
  },

  loggedOut() {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGGED_OUT
    });

    var router = require('../router');
    router.transitionTo('login');
  },

  receiveBoard(data) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOARD,
      rawData: data
    });
  },

  receiveOrganization(data) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ORGANIZATION,
      rawData: data
    });
  }
};
