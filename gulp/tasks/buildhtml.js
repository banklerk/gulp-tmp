const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()

module.exports = function buildhtml() {
  return src(['app/template/**/*.*', '!app/template/**/_*.*'])
    .pipe($.fileInclude())    
    .pipe(dest('app/'))
}