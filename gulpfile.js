function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const renameCss = require("gulp-rename");



gulp.task("hello", function (done) {
  console.log("Привет, мир!");
  done();
});

gulp.task("browser-sync", function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("minify", function() {
  return gulp.src("./css/*.css")
    .pipe(cleanCSS())
    .pipe(renameCss({suffix:".min"}))
    .pipe(gulp.dest("./css"));
});