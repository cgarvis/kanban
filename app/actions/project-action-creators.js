var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  createBoard: function(name) {
    data.createBoard(name);
  },
};
