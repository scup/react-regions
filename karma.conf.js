module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS2'],
    files: [
      {pattern: 'test-context.js', watched: false}
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
