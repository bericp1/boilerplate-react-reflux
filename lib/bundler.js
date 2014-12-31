var browserify = require('browserify'),
  reactify = require('reactify');

module.exports = function(config){
  // Create a browserify instance with proper options
  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    transform: [reactify],
    debug: config.browserify.debug,
    paths: config.browserify.paths
  });

  // Add the entry module to the bundler
  bundler.add('./public/src/scripts/app.js');

  return bundler;
};