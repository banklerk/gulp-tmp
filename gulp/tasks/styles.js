const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()
const prefix = require('autoprefixer')
const magicFont = require('postcss-font-magician')
const mqpacker = require('css-mqpacker')
const mqsorter = require('sort-css-media-queries')
const rucksack = require('rucksack-css')

let processors = [
  rucksack(),
  magicFont({
    formats: 'woff2 woff',
    display: 'auto',
    variants: {
      'Montserrat': {
        '400': [],
        '700': [],
      },
      'Roboto Slab': {
        '400 normal': [],
      }
    },
    foundries: ['google']
  }),
  prefix({ overrideBrowserslist: ['last 10 versions'] }),
  mqpacker({ sort: mqsorter.desktopFirst }),
]

module.exports = function styles() {
  return src(['app/styles/less/*.*', '!app/styles/less/_*.*', '!app/styles/less/smart-grid.less'])
    .pipe($.plumber({
      errorHandler: $.notify.onError((err) => {
        return {
          title: 'style',
          message: err.message
        };
      })
    }))
    .pipe($.lessGlob())
    .pipe($.less())
    .pipe($.postcss(processors))
    .pipe(dest('app/css'))
    .pipe($.csso({ sourceMap: true }))
    .pipe($.rename({ suffix: ".min" }))
}