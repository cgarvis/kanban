var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  loginWithGithub() {
    data.authWithOAuth('github');
  },

  logout() {
    data.unauth();
  }
};
