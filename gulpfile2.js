// Keep reading this: https://css-tricks.com/gulp-for-beginners/

var gulp = require("gulp");
var sass = require("gulp-sass");
var header = require("gulp-header");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var pkg = require("./package.json");
var browserSync = require("browser-sync").create();

// Set the banner content
// var banner = [
//   "/*!\n",
//   " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
//   " * Copyright 2013-" + new Date().getFullYear(),
//   " <%= pkg.author %>\n",
//   " * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n",
//   " */\n",
//   ""
// ].join("");

// Copy third party libraries from /node_modules into /vendor
// gulp.task("vendor", function() {
//   // Bootstrap
//   gulp
//     .src([
//       "./node_modules/bootstrap/dist/**/*",
//       "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
//       "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
//     ])
//     .pipe(gulp.dest("./vendor/bootstrap"));
//
//   // jQuery
//   gulp
//     .src([
//       "./node_modules/jquery/dist/*",
//       "!./node_modules/jquery/dist/core.js"
//     ])
//     .pipe(gulp.dest("./vendor/jquery"));
// });

// Compile SCSS
gulp.task("css:compile", function() {
  return (
    gulp
      .src("src/scss/**/*.scss")
      .pipe(
        sass
          .sync({
            outputStyle: "expanded"
          })
          .on("error", sass.logError)
      )
      // .pipe(
      //   header(banner, {
      //     pkg: pkg
      //   })
      // )
      .pipe(gulp.dest("public/css"))
  );
});

// Minify CSS
gulp.task("css:minify", ["css:compile"], function() {
  return gulp
    .src(["src/css/*.css", "!./css/*.min.css"])
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

// CSS
gulp.task("css", ["css:compile", "css:minify"]);

// Default task
gulp.task("default", ["css", "vendor"]);

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task("dev", ["css", "browserSync"], function() {
  gulp.watch("./scss/*.scss", ["css"]);
  gulp.watch("./*.html", browserSync.reload);
});

// Image processing
gulp.task("images", function() {
  var out = "final/img/";
  return gulp
    .src("img/**/*")
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});
