module.exports = {
  entry: './examples/main.jsx',
  output: {
    filename: 'dist/bundle.js',
    sourceFilename: '[file].map'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/, loader: "eslint-loader",
      exclude: /(node_modules|bower_components)/
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  }
};
