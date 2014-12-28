var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  save: function(task) {
    data.update(task);
  },
  remove: function(task) {
    data.removeTask(task.projectId, task);
  },
};


