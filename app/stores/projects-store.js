var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _projects = [];

function loadRawData(rawData) {
  _projects = [];

  var rawProjects = rawData.projects || {};
  for (var projectId in rawProjects) {
    if (rawProjects.hasOwnProperty(projectId)){
      var rawProject = rawProjects[projectId];
      rawProject.id = projectId;
      _projects.push(rawProject);
    }
  }
}

var ProjectsStore = createStore({
  getAll: function() {
    return _projects;
  }
});

ProjectsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_DATA:
      loadRawData(action.rawData);
      ProjectsStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = ProjectsStore;
