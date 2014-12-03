module.exports = {
  cache: true,
  entry: './app/main',
  output: {
    path: 'app',
    filename: './app.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  }
};
