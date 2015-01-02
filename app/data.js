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

  update(task) {
    console.log('Updating task', task);

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
