var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  createTask: function(projectId, task) {
    data.createTask(projectId, task);
  },
  selectProject: function(projectId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SELECT_PROJECT,
      projectId: projectId
    });
  }
};

