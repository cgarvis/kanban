var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var TasksStore = require('./tasks-store');

var _lists = [ 'ideas', 'backlog', 'doing', 'done' ];
var _boardId;
var _selectedTaskId;

var BoardStore = createStore({
  initialize: function(boardId) {
    console.log('initializing board store with', boardId);
    _boardId = boardId;
  },

  getAllLists: function() {
    return _lists;
  },

  getAllForCurrentBoard: function() {
    return TasksStore.getAllByBoardId(_boardId);
  },

  getSelectedTask: function() {
    if(_selectedTaskId) {
      return TasksStore.getById(_selectedTaskId);
    }

    return null;
  }
});

BoardStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SELECT_BOARD:
      BoardStore.initialize(action.boardId);
      break;
    case ActionTypes.RECEIVE_RAW_DATA:
      Dispatcher.waitFor([TasksStore.dispatchToken]);
      BoardStore.emitChange();
      break;
    case ActionTypes.SELECT_TASK:
      _selectedTaskId = action.taskId;
      BoardStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = BoardStore;
