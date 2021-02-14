const { src, dest, parallel, series, watch } = require('gulp')

module.exports = function buildcopy() {
  return src([
    'app/*.*',
    '{app/js,app/css}/*.min.*',
    '!app/js/src/**/*',
    'app/img/**/*.*',
    '!app/img/src/**/*',
    'app/fonts/**/*'
  ], { base: 'app/' })
    .pipe(dest('dist'))
}