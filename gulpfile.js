function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask

const {src, dest, watch} = require("gulp");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const renameCss = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");






function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on("change", browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on("change", browserSync.reload);
};

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
    }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};
exports.serve = bs;


function min() {
  return src("./css/*.css")
    .pipe(cleanCSS())
    .pipe(renameCss({suffix:".min"}))
    .pipe(dest("./css"));
};