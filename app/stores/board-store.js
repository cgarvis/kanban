var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var TasksStore = require('./tasks-store');

var _lists = [ 'ideas', 'backlog', 'doing', 'done' ];
var _tasks = [];
var _projectId;

var BoardStore = createStore({
  initialize: function(projectId) {
    console.log('initializing board store with', projectId);
    _projectId = projectId;
  },

  getAllLists: function() {
    return _lists;
  },

  getAllForCurrentProject: function() {
    return TasksStore.getAllByProjectId(_projectId);
  }
});

BoardStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SELECT_PROJECT:
      BoardStore.initialize(action.projectId);
      break;
    case ActionTypes.RECEIVE_RAW_DATA:
      Dispatcher.waitFor([TasksStore.dispatchToken]);
      BoardStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = BoardStore;
