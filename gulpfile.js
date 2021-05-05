var { src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const rollup = require('gulp-better-rollup');
const babelRollup = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function initBrowserSync(cb) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
  cb();
}

function setSass(cb) {
  src('src/scss/**/*.scss')
  .pipe(sass({style: 'expanded'}))
  .pipe(dest('dist/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
  cb();
}

function setHtml(cb) {
  src('src/*.html')
  .pipe(dest('dist'))
  .pipe(browserSync.reload({
    stream: true
  }));
  cb();
}

function setImages(cb) {
  src('src/images/*')
  .pipe(dest('dist/images'));
  cb();
}

function setJs(cb) {
  src('src/js/**/*.js')
  .pipe(rollup({ plugins: [babelRollup(), resolve(), commonjs()] }, 'umd'))
  .pipe(dest('dist/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
  cb();
}

function reloadFiles(cb){
  watch('src/*.html', setHtml); 
  watch('src/scss/**/*.scss', setSass); 
  watch('src/*.html', browserSync.reload); 
  watch('src/js/**/*.js', browserSync.reload); 
  cb();
}

exports.build = series(initBrowserSync, setSass, setJs, setImages, setHtml, reloadFiles);
exports.default = series(initBrowserSync, setSass, setJs, setImages, setHtml, reloadFiles);