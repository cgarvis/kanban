var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  createBoard: function(organizationId, name) {
    data.createBoard(organizationId, name);
  },

  createTask: function(boardId, task) {
    data.createTask(boardId, task);
  },

  move: function(task, toList) {
    if(task.state !== toList) {
      task.state = toList;
      data.update(task);
    }
  },

  selectBoard: function(boardId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SELECT_BOARD,
      boardId: boardId
    });
  },

  selectTask: function(task) {
    console.log('Task selected', task);
    Dispatcher.handleViewAction({
      type: ActionTypes.SELECT_TASK,
      taskId: task.id
    });
  }
};

