var gulp = require('gulp'),
  browserify = require('browserify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  transform = require('vinyl-transform'),
  extend = require('extend'),
  moulder = require('./lib/config-moulder');

var environment = process.env.NODE_ENV || 'production';

console.log('NODE_ENV:', process.env.NODE_ENV);

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

gulp.task('browserify', ['vendor'], function(){

  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  var pipeline = gulp.src(['./public/src/js/app.js'])
  .pipe(browserified);

  if(environment === 'production')
    pipeline.pipe(uglify());

  return pipeline.pipe(gulp.dest('./public/dist'));

});

gulp.task('copy', function(){

  return gulp.src(
      ['./public/src/index.html', './public/src/assets/**/*.*'],
      {base:'./public/src/'}
    )
    .pipe(gulp.dest('./public/dist'));

});

gulp.task('build', ['browserify', 'copy']);

gulp.task('default', ['build']);
