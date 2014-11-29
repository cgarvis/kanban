var _ = require('lodash');

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _tasks = [];
var _projectIndex = [];

function loadRawData(rawData) {
  _.each(rawData.projects, function(project, projectId) {
    _projectIndex[projectId] = [];
    _.each(project.tasks, function(task, taskId) {
      _tasks[taskId] = task;
      _tasks[taskId].id = taskId;
      _tasks[taskId].projectId = projectId;
      _projectIndex[projectId].push(taskId);
    });
  });
}

var TasksStore = createStore({
  getAllByProjectId: function(projectId) {
    return _.map(_projectIndex[projectId], function(taskId) {
      return _tasks[taskId];
    });
  }
});

TasksStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_DATA:
      loadRawData(action.rawData);
      TasksStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = TasksStore;
