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
  .pipe(browserSync.stream())
  cb();
}

function setHtml(cb) {
  src('src/*.html')
  .pipe(dest('dist'))
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
  .pipe(browserSync.stream())
  cb();
}

function reloadFiles(cb){
  watch('src/*.html', setHtml); 
  watch('src/scss/**/*.scss', setSass); 
  watch('src/*.html').on('change', browserSync.reload);
  watch('src/js/**/*.js', setJs, browserSync.reload); 
  cb();
}

exports.default = series(setSass, setJs, setImages, setHtml, initBrowserSync, reloadFiles);