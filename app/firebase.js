var Firebase = require("firebase");

//Firebase.enableLogging(true);

var FIREBASE_URL = "https://kanban-tasks.firebaseio.com/";

module.exports = new Firebase(FIREBASE_URL);
