// Gulp plugins
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),

  // For Browserify compat
  source = require('vinyl-source-stream'),

  //Browserify module, watch wrapper, and JSX transform
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),

  // Load config file and moulder and detect environment
  moulder = require('./lib/config-moulder'),
  environment = process.env.NODE_ENV || 'production',
  config = require('./config');

gutil.log('Detected environment: ', environment);

// Mould config to fit environment
config = moulder(config, environment).build;


// Concat vendor scripts (described in config)
gulp.task('vendor', function(){

  if(config.vendor.length === 0) return;

  return gulp.src(config.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/dist'));

});

// Create a browserify instance with proper options
var bundler = browserify({
  cache: {}, packageCache: {}, fullPaths: true,
  transform: [reactify]
});

// Add the entry module to the bundler
bundler.add('./public/src/js/app.js');

// Actually use bundler to perform bundling
// Can be called indefinitely throughout bulid
// process to rebundle.
var bundle = function(bundler){
  var pipeline = bundler.bundle().pipe(source('app.js'));

  if(environment === 'production')
    pipeline.pipe(uglify());

  return pipeline.pipe(gulp.dest('./public/dist'));
};

// Task to call default bundler
gulp.task('browserify', ['vendor'], function(){

  return bundle(bundler);

});

// Wraps bundler with watchify to watch changes to bundled
// files and rebundles as necessary. Also starts `server.js`.
gulp.task('serve', ['vendor', 'copy'], function(){

  bundler = watchify(bundler);
  bundler.on('update', function(){
    bundle(bundler);
    gutil.log('Rebundling...');
  });

  require('./server')({logger:gutil.log});

  return bundle(bundler);

});

// Alias
gulp.task('dev', ['serve']);

// Copies static files that don't need any build processing to `public/dist`
gulp.task('copy', function(){

  return gulp.src(
      ['./public/src/index.html', './public/src/assets/**/*.*'],
      {base:'./public/src/'}
    )
    .pipe(gulp.dest('./public/dist'));

});

// For deployment. Makes front-end ready to serve from `public/dist`
gulp.task('build', ['copy', 'browserify']);
gulp.task('default', ['build']);
