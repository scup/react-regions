module.exports = function (config) {
  config.set({
    port: 9876,
    browsers: ['PhantomJS2'],
    files: [
      {pattern: 'test-context.js', watched: false},
      'node_modules/babel-polyfill/dist/polyfill.js'
    ],
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs2-launcher'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test-context.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {test: /\.js/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
