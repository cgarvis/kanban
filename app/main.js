var React = require('react');

// React configurations
React.initializeTouchEvents(true);

var router = require('./router');
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('react-root'));
});

var Data = require('./data');
Data.init();
