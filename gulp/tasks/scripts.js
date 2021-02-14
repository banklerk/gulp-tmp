const { src, dest, parallel, series, watch } = require('gulp')
const $ = require('gulp-load-plugins')()
const webpack = require('webpack-stream')

module.exports = function scripts() {
  return src(['app/js/*.js', '!app/js/*.min.js'])
    .pipe(webpack({
      mode: 'production',
      performance: { hints: false },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env'],
              plugins: ['babel-plugin-root-import']
            }
          }
        ]
      }
    })).on('error', function handleError() {
      this.emit('end')
    })
    .pipe($.rename('main.min.js'))
    .pipe(dest('app/js'))
}