var SessionStore = require('../stores/session-store');

var Login = require('../pages/login');

var AuthenticationMixin = {
  statics: {
    willTransitionTo: function (transition) {
      if (!SessionStore.getLoggedInStatus()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};

module.exports = AuthenticationMixin;

