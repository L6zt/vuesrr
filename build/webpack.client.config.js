const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isP = process.env.NODE_ENV === "production"
const config = merge(base, {
  // ? entry: {app: [] strArray 失败}
  entry: {
    app: ['babel-polyfill' ,'./src/entry-client.js']
  },
  output: {
	  publicPath: isP ? 'http://ssrv.jcmark.cn/res/' : '/'
  },
  resolve: {
    alias: {
	    'ajax': path.resolve(__dirname, '../src/utils/cAjax.js')
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
