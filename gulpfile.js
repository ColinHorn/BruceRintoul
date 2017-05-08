var gulp = require('gulp');
var kit = require('gulp-kit');
var compass = require('compass-importer');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();

gulp.task('kitFiles', function(){
    return gulp.src('app/kit/**/*.kit')
    .pipe(kit())
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({
      injectChanges: true,
      stream: true
    }))
});

gulp.task('sass', function() {
  return gulp.src('app/scss/styles.scss')
    .pipe(sassGlob())
    .pipe(sass({ importer: compass, outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/kit/**/*.kit',['kitFiles']);
  gulp.watch("app/scripts/**/*.js").on("change", browserSync.reload);
});
