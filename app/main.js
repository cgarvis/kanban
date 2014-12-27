require('material/dist/material.css');
require('./main.css');

var React = require('react');
var ReactStyle = require('react-style');

ReactStyle.inject();

// React configurations
React.initializeTouchEvents(true);

var Data = require('./data');
Data.init();

var routes = require('./routes');
React.render(routes, document.getElementById('react-root'));
