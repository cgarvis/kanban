var React = require('react');

// React configurations
React.initializeTouchEvents(true);

require('./utils/pollyfills');

var router = require('./router');
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('react-root'));
});

require('./auth');
require('./data');
