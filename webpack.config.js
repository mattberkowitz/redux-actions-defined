module.exports = {
  context: __dirname,
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'redux-actions-defined',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
