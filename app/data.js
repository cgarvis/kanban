var Firebase = require("firebase");

var ServerActionCreators = require('./actions/server-action-creators');

class Data {
  init() {
    this.ref = new Firebase("https://kanban-tasks.firebaseio.com/");
    this.ref.on('value', this.onChange, this);
    this.data = {}
  }

  onChange(snapshot) {
    console.log('Firebase data has changed');
    this.data = snapshot.val();
    ServerActionCreators.receiveData(this.data);
  }

  createTask(projectId, task) {
    this.ref
      .child('projects')
      .child(projectId)
      .child('tasks')
      .push({task: task, state: 'ideas', type: 'task'})
  }
}

module.exports = new Data;
