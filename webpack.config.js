module.exports = {
  cache: true,
  entry: './app/main',
  output: {
    path: 'app',
    filename: './app.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  }
};
