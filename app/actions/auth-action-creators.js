var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  loginWithGithub() {
    require('../auth').authWithOAuth('github');
  },

  logout() {
    require('../auth').unauth();
  }
};
