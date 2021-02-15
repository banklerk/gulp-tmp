const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const smartgrid = require('smart-grid')
const buildhtml = require('./gulp/tasks/buildhtml')
const styles = require('./gulp/tasks/styles')
const images = require('./gulp/tasks/images')
const scripts = require('./gulp/tasks/scripts')
const spriteSVG = require('./gulp/tasks/spriteSVG')
const iconPrint = require('./gulp/tasks/iconPrint')
const cleandist = require('./gulp/tasks/cleandist')
const buildcopy = require('./gulp/tasks/buildcopy')

async function grid() {
  delete require.cache[require.resolve('./gulp/tasks/smartcfg.js')]
  let settings = require('./gulp/tasks/smartcfg.js')
  smartgrid('app/styles/less/', settings)
}

function server() {
  browserSync.init({
    server: 'app/',
    notify: false,
    open: true,
    cors: true
  }),

    watch('./gulp/tasks/smartcfg.js', { usePolling: true },
      series(grid)).on('change', browserSync.reload)

  watch('app/styles/less/**/*', { usePolling: true },
    series(styles)).on('change', browserSync.reload)

  watch(['app/js/**/*.js', '!app/js/**/*.min.js'], { usePolling: true },
    series(scripts)).on('change', browserSync.reload)

  watch('app/img/src/*.@(png|jpg|svg)', { usePolling: true },
    series(images)).on('change', browserSync.reload)

  watch('app/img/src/inline-icons/*.svg', { usePolling: true },
    series(spriteSVG)).on('change', browserSync.reload)

  watch('app/**/*.html', { usePolling: true },
    series(buildhtml)).on('change', browserSync.reload)
}

exports.build = series(cleandist, buildhtml, scripts, styles, images,spriteSVG, iconPrint, buildcopy)
exports.default = series(buildhtml, scripts, grid, styles, images, spriteSVG, iconPrint, parallel(server))
