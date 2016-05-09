var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var filesize = require('gulp-filesize');

var jsScripts = [
  'client/scripts/utils.js',
  'client/scripts/app.js'
];

var paths = {
  scripts: ['client/scripts/*.js'],
  html: ['client/*.html'],
  styles: ['client/*.css']
}

gulp.task('clean', function(){
  return gulp.src('client/build', {
    read: false
  })
  .pipe(clean());
});

gulp.task('build', function(){
  return gulp.src(jsScripts)
    .pipe(concat('mlb.min.js', {
      newLine: '\n'
    }))
    .pipe(gulp.dest('client/build/'))
    .pipe(uglify())
    .pipe(gulp.dest('client/build/'))
    .pipe(filesize())
    .on('error', gutil.log);
});
