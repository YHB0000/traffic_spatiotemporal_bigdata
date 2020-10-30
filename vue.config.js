module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        // lodash: '_',
        echarts: 'echarts'
        // nprogrss: 'NProgress',
        // 'vue-quil-editor': 'VueQuilEditor'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  pwa: {
    iconPaths: {
      favicon32: 'bigdata_favicon.ico',
      favicon16: 'bigdata_favicon.ico',
      appleTouchIcon: 'bigdata_favicon.ico',
      maskIcon: 'bigdata_favicon.ico',
      msTileImage: 'bigdata_favicon.ico'
    }
  }
}
