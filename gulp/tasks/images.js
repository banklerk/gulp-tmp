const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const argv = require('yargs').argv
const gulpif = require('gulp-if')

module.exports = function images() {
  del('app/img/*.@(png|jpg|svg|ico)', { force: true })
  return src(['app/img/src/**/*.@(png|jpg|svg|ico)', '!app/img/src/inline-icons/*.svg'])
  .pipe(gulpif(!argv.draft, $.tinypng('yw3kpc9DfNpPNmHlW0cC7BtcmXjbKJfL')))
    .pipe(dest('app/img/'))
}