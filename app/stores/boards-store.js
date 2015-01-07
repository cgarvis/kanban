var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var createStore = require('../utils/create-store');

var _boards = [];

function loadRawData(rawData) {
  _boards = [];

  var rawBoards = rawData.boards || {};
  for (var boardId in rawBoards) {
    if (rawBoards.hasOwnProperty(boardId)){
      var rawBoard = rawBoards[boardId];
      rawBoard.id = boardId;
      _boards.push(rawBoard);
    }
  }
}

var BoardsStore = createStore({
  getAll: function() {
    return _boards;
  }
});

BoardsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_DATA:
      loadRawData(action.rawData);
      BoardsStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = BoardsStore;
