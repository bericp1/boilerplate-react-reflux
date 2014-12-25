var gulp = require('gulp'),
  gutil = require('gulp-util'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  extend = require('extend'),
  moulder = require('./lib/config-moulder');

var environment = process.env.NODE_ENV || 'production';

gutil.log('NODE_ENV:', process.env.NODE_ENV);

var defaults = {
  vendor: []
};

var config = extend(true, {}, defaults, moulder(require('./config')).build[environment]);

gulp.task('vendor', function(){

  if(config.vendor.length === 0) return;

  return gulp.src(config.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/dist'));

});

var bundler = browserify({
  cache: {}, packageCache: {}, fullPaths: true,
  transform: [reactify]
});
bundler.add('./public/src/js/app.js');

var bundle = function(bundler){
  var pipeline = bundler.bundle().pipe(source('app.js'));

  if(environment === 'production')
    pipeline.pipe(uglify());

  return pipeline.pipe(gulp.dest('./public/dist'));
};

gulp.task('browserify', ['vendor'], function(){

  return bundle(bundler);

});

gulp.task('serve', ['vendor', 'copy'], function(){

  bundler = watchify(bundler);
  bundler.on('update', function(){
    bundle(bundler);
    gutil.log('Rebundled since files changed');
  });

  require('./server')({logger:gutil.log});

  return bundle(bundler);

});

gulp.task('copy', function(){

  return gulp.src(
      ['./public/src/index.html', './public/src/assets/**/*.*'],
      {base:'./public/src/'}
    )
    .pipe(gulp.dest('./public/dist'));

});

gulp.task('build', ['copy', 'browserify']);

gulp.task('default', ['build']);
