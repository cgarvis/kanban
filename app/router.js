// router.js
var routes = require('./routes');
var Router = require('react-router');

// we can create a router before "running" it
var router = Router.create({
  routes: routes,
//  location: Router.HistoryLocation
});


module.exports = router;
