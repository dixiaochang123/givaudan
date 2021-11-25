'use strict'

const path = require('path')
const config = require('./src/utils/config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const { mockUrl,mockUrl_new } = config[process.env.NODE_ENV]
console.log('mockUrl',mockUrl)
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    disableHostCheck: true,
    host:'0.0.0.0',
    port:'8081',
    https: false,
    open: false, //配置自动启动浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // '/api': {
      //   target: mockUrl_new,
      //   pathRewrite: {
      //     '^/api': ''
      //   },
      //   secure: false,
      //   changeOrigin: true
      // },
      // '/dev-api': {
      //   target: mockUrl,
      //   pathRewrite: {
      //     '^/dev-api': '/'
      //   },
      //   secure: false,
      //   changeOrigin: true
      // },
      '/wjyql': {
        target: mockUrl,
        pathRewrite: {
          '^/wjyql': '/'
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    name: 'panda-mall',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
