var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  receiveData: function(data) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_DATA,
      rawData: data
    });
  }
};
