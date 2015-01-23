var ServerActionCreators = require('./actions/server-action-creators');
var ref = require('./firebase');

class Auth {
  constructor() {
    ref.onAuth(this._onAuthChange.bind(this));
  }

  authWithOAuth(provider) {
    // You can use authWithOAuthPopup as well
    ref.authWithOAuthRedirect(provider, function(err) {
      if(err) {
        console.log(err);
      }
    });
  }

  unauth() {
    ref.unauth();
  }

  _onAuthChange(authData) {
    if (authData) {
      var authenticatedUser = {
        uid: authData.uid,
        avatar: authData.github.cachedUserProfile.avatar_url,
        displayName: authData.github.displayName,
        token: authData.token
      }

      ServerActionCreators.loggedIn(authenticatedUser)
    } else {
      ServerActionCreators.loggedOut();
    }
  }
}

module.exports = new Auth();
