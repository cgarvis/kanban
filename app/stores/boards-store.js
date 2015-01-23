var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _boards = {};

function loadBoard(rawData) {
  _boards[rawData.id]= rawData;
}

var BoardsStore = createStore({
  getById(id) {
    return _boards[id];
  },

  getTask(boardId, taskId) {
    var board = BoardsStore.getById(boardId);
    var tasks = board.tasks || {};
    var task = tasks[taskId];

    if(!task) {
      return null
    }

    task.id = taskId;
    task.boardId = boardId;

    return task;
  },

  getTasks(boardId) {
    var board = BoardsStore.getById(boardId);
    var tasks = board.tasks || {};

    return Object.keys(tasks).map((key) => {
      var task = tasks[key];
      task.id = key;
      task.boardId = board.id;
      return task;
    });
  },

  getAll() {
    return Object.keys(_boards).map((key) => {
      return _boards[key];
    });
  }
});

BoardsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_BOARD:
      loadBoard(action.rawData);
      BoardsStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = BoardsStore;
