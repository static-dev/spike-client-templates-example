const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  // make sure your templates are ignored so they don't compile normally
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md', '**/templates/*.sgr', 'yarn.lock'],
  reshape: htmlStandards({
    locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } }
  }),
  postcss: cssStandards(),
  // here, we add a custom loader for our client templates.
  // setting locals to false will compile as a template rather than html
  module: {
    rules: [{
      test: /templates\/.*\.sgr$/,
      use: [{
        loader: 'reshape-loader',
        options: htmlStandards({ locals: false })
      }]
    }]
  },
  babel: jsStandards
}
