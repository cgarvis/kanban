var Firebase = require("firebase");

var ServerActionCreators = require('./actions/server-action-creators');

class Data {
  init() {
    this.ref = new Firebase("https://kanban-tasks.firebaseio.com/");
    this.ref.on('value', this.onChange, this);
    this.ref.onAuth(this.onAuthChange);
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
    if (authData) {
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

  createProject(name) {
    this.ref
      .child('projects')
      .push({
        name: name
      });
  }

  update(task) {
    this.ref
        .child('projects')
        .child(task.projectId)
        .child('tasks')
        .child(task.id)
        .set(task);
  }

  createTask(projectId, title) {
    this.ref
      .child('projects')
      .child(projectId)
      .child('tasks')
      .push({
        task: title,
        state: 'ideas',
        type: 'task',
        created_at: Date.now()
      });
  }

  removeTask(projectId, task) {
    this.ref
      .child('projects')
      .child(projectId)
      .child('tasks')
      .child(task.id)
      .remove();
  }
}

module.exports = new Data;
