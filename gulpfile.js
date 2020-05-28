function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask

const {src, dest, watch, series} = require("gulp");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const renameCss = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');






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
    .pipe(cleanCSS({compatibility: 'ie9,-properties.merging'}))
    //.pipe(renameCss({suffix:".min"}))
    .pipe(dest("dist/css/"));
};

function minjs() {
  return src(["js/**.js", "!js/**.min.js"])
  .pipe(minify({
    ext:{
        min:'.js'
    },
    noSource: true,
    ignoreFiles: ['*.min.js']
}))
  .pipe(dest("dist/js/")),
  src("js/**.min.js")
  .pipe(dest("dist/js/"));
};

function minhtml() {
  return src("**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"));
};

function minimg() {
  return src ("img/**/*.{png,jpg,jpeg}")
    .pipe(tinypng({
      key: 'qDT3PsZK01RRJwfVj80dQ189Kj1v7ZXc'
  }))
    .pipe(dest("dist/img/"));
};

function php() {
  return src("**.php")
    .pipe(dest('dist/')),
    src("phpmailer/**/**")
    .pipe(dest("dist/phpmailer/"));
};

function fonts() {
  return src("fonts/**/**")
    .pipe(dest('dist/fonts/'));
};

function svg() {
  return src("img/**/*.svg")
    .pipe(dest('dist/img/'));
};
exports.build = series(min, minjs, minhtml, php, fonts, svg);