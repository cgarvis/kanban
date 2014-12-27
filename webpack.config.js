module.exports = {
  cache: true,
  entry: './app/main',
  devtool: '#sourcemap',
  output: {
    path: 'app',
    filename: './app.js',
    sourceMapFilename: './app.js.map'
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
