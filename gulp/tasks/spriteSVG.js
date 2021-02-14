const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()

module.exports = function spriteSVG() {
  return src('app/img/src/inline-icons/*.svg')
    .pipe($.svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe($.replace('&gt;', '>'))
    .pipe($.svgSprite({
      mode: {
        stack: { dest: '.' },
      }
    }))
    .pipe(dest('app/img/'))
}


