let webpack = require('webpack');
let path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './spec/**/*.spec.jsx'
    ],
    preprocessors: {
        './spec/**/*.spec.jsx' : ['webpack']
    },
    webpack: {
      module: {
        loaders: [
            {
            test : /\.jsx?$/,
            exclude : /(node_modules|bower_components)/,
            loader : 'babel'
          },
          // {
          //     test: /\.less$/,
          //     loader: 'style!css!less'
          // }
        ]
      },
      plugins: [
        new webpack.ResolverPlugin([
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ])
      ],
      resolve: {
        root: [path.join(__dirname, './bower_components'), path.join(__dirname, './src')]
      }
    },
    webpackMiddleware: { noInfo: true },
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher')
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 86400000,
    singleRun: true
  })
}
