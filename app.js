const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  // make sure your templates are ignored so they don't compile normally
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md', '**/templates/**.sgr'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' }
    })
  },
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx })
  },
  // here, we add a custom loader for our client templates.
  // setting locals to false will compile as a template rather than html
  module: {
    loaders: [
      { test: /templates\/.*\.sgr$/, loader: 'reshape?locals=false' }
    ]
  },
  babel: { presets: [jsStandards] },
  plugins: [
    // if you have issues with the templates, try clearing your cache!
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
