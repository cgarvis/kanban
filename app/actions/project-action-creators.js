var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var data = require('../data');

module.exports = {
  createProject: function(name) {
    data.createProject(name);
  },
};
