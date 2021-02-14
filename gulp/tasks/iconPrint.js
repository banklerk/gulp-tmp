const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()
const print = require('gulp-print').default

let options = {
  host: 'https://fontello.com',
  font: 'fonts',
  css: 'fonts/fontello',
  assetsOnly: true
}

module.exports = function iconPrint() {
  return src('config.json')
    .pipe($.fontello(options))
    .pipe(print())
    .pipe(dest('app/'))
}