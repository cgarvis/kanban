var ServerActionCreators = require('./actions/server-action-creators');
var ref = require('./firebase');

class Auth {
  constructor() {
    ref.onAuth(this._onAuthChange.bind(this));
  }

  authWithOAuth(provider) {
    // prefer pop-ups, so we don't navigate away from the page
    this.ref.authWithOAuthPopup(provider, function(err) {
      if(err) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          ref.authWithOAuthRedirect(provider, function(error) {
            console.error(err);
          });
        } else {
          console.error(err);
        }
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
