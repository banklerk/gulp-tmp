const del = require('del')

module.exports = function cleandist() {
  return del(['dist/**/*', '!dist/README.md'], { force: true })
}