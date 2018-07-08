var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var imageminJpegRecompress = require("imagemin-jpeg-recompress");
var imageminPngquant = require("imagemin-pngquant");
var browserSync = require("browser-sync").create();

// Minify CSS and rename with min
gulp.task("cssMinify", function() {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Minify JS and rename with min
gulp.task("jsMinify", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/js"));
});

// Optimize images
gulp.task("images", function() {
  return gulp
    .src("src/img/**/*.+(png|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imageminJpegRecompress({
            progressive: true,
            max: 80,
            min: 70
          }),
          imageminPngquant({ quality: "75-85" }),
          imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])
      )
    )
    .pipe(gulp.dest("public/img"));
});

// Move fonts from dev to prod
gulp.task("fonts", function() {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("public/fonts"));
});

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "public"
    }
  });
});

// Dev task
gulp.task("dev", ["cssMinify", "browserSync"], function() {
  gulp.watch("./css/*.css", ["css"]);
  gulp.watch("./*.html", browserSync.reload);
});
