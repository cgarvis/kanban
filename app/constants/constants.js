var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    LOGGED_IN: null,
    LOGGED_OUT: null,
    RECEIVE_AUTH: null,
    RECEIVE_BOARD: null,
    RECEIVE_ORGANIZATION: null,
    SELECT_BOARD: null,
    SELECT_TASK: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
