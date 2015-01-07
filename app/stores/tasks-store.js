var _ = require('lodash');

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _tasks = [];
var _boardIndex = [];

function loadRawData(rawData) {
  _.each(rawData.boards, function(board, boardId) {
    _boardIndex[boardId] = [];
    _.each(board.tasks, function(task, taskId) {
      _tasks[taskId] = task;
      _tasks[taskId].id = taskId;
      _tasks[taskId].boardId = boardId;
      _boardIndex[boardId].push(taskId);
    });
  });
}

var TasksStore = createStore({
  getAllByBoardId: function(boardId) {
    return _.map(_boardIndex[boardId], function(taskId) {
      return _tasks[taskId];
    });
  },

  getById: function(id) {
    return _tasks[id];
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
