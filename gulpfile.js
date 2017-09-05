/// <binding BeforeBuild='clean, sass-compile' AfterBuild='min' Clean='clean' ProjectOpened='watch-sass' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  kit = require("gulp-kit"),
  compass = require("compass-importer"),
  sassGlob = require("gulp-sass-glob"),
  image = require("gulp-image"),
  browserSync = require("browser-sync").create();

var paths = {
  webroot: "./"
};

gulp.task("kitFiles", function() {
  return gulp.src("./kit/**/*.kit").pipe(kit()).pipe(gulp.dest("./")).pipe(
    browserSync.reload({
      injectChanges: true,
      stream: true
    })
  );
});

gulp.task("sass", function() {
  return gulp
    .src("./scss/styles.scss")
    .pipe(sassGlob())
    .pipe(
      sass({ importer: compass, outputStyle: "compressed" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(gulp.dest("./css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("miniJS", function() {
  return gulp
    .src([
      "./assets/**/*.js",
      "./Scripts/**/*",
      "!./Scripts/vendor/**",
      "!./Scripts/dist",
      "!./Scripts/dist/**"
    ])
    .pipe(uglify())
    .pipe(concat("allScripts.js"))
    .pipe(gulp.dest("./Scripts/dist/"));
});

gulp.task("image", function() {
  gulp
    .src([
      "./images/**/*",
      "!./images/select.png",
      "!./images/optimised",
      "!./images/optimised/**"
    ])
    .pipe(image())
    .pipe(gulp.dest("./images/optimised/"));
});

gulp.task("browserSync", function() {
  browserSync.init({
    injectChanges: true,
    notify: false,
    server: ["./"]
  });
});

gulp.task("watch", ["browserSync", "sass", "miniJS", "image"], function() {
  gulp.watch("./scss/**/*.scss", ["sass"]);
  gulp.watch("./kit/**/*.kit", ["kitFiles"]);
  gulp.watch(["./Scripts/**/*.js", "!./Scripts/dist/*.js"], ["miniJS"]);
  gulp.watch("./Scripts/dist/*.js").on("change", browserSync.reload);
});
