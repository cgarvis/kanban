var Firebase = require("firebase");

var ServerActionCreators = require('./actions/server-action-creators');

class Data {
  init() {
    this.ref = new Firebase("https://kanban-tasks.firebaseio.com/");
    this.ref.on('value', this.onChange, this);

    this.ref.onAuth((authData) => {
      this.onAuthChange(authData);
    });

    this.data = {}
  }

  authWithOAuth(provider) {
    // You can use authWithOAuthPopup as well
    this.ref.authWithOAuthRedirect(provider, function(err) {
      if(err) {
        console.log(err);
      }
    });
  }

  unauth() {
    this.ref.unauth();
  }

  onAuthChange(authData) {
    this.auth = authData;

    if (authData) {
      this.ref.child('users').child(authData.uid).set(authData);

      var authenticatedUser = {
        avatar: authData.github.cachedUserProfile.avatar_url,
        displayName: authData.github.displayName,
        token: authData.token
      }

      ServerActionCreators.loggedIn(authenticatedUser)
    } else {
      ServerActionCreators.loggedOut();
    }
  }

  onChange(snapshot) {
    this.data = snapshot.val();
    ServerActionCreators.receiveData(this.data);
  }

  createBoard(name) {
    this.ref
      .child('boards')
      .push({
        name: name
      });
  }

  update(task) {
    this.ref
        .child('boards')
        .child(task.boardId)
        .child('tasks')
        .child(task.id)
        .set(task);
  }

  createTask(boardId, title) {
    this.ref
      .child('boards')
      .child(boardId)
      .child('tasks')
      .push({
        task: title,
        state: 'ideas',
        type: 'task',
        created_at: Date.now()
      });
  }

  removeTask(boardId, task) {
    this.ref
      .child('boards')
      .child(boardId)
      .child('tasks')
      .child(task.id)
      .remove();
  }
}

module.exports = new Data;
