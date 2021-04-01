const { configureWebpack, chainWebpack } = require('./.webpack')
const { isProd, argv } = require('./.webpack/utils')
//const { default: babel } = require('vite-babel-plugin').default

//const alias = {
//  ...require('./.webpack/aliases').resolveAliases('.'),
//}

//const babelPlugin = babel(require('./babel.config'))

module.exports = {
  /* build, dev, ci params */
  lintOnSave: false,
  productionSourceMap: !!argv('sourcemaps'),
  publicPath: argv('publicPath') || '/',

  /* Webpack config manipulation */
  configureWebpack,
  chainWebpack,

  /* CSS */
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: isProd()
            ? '[hash:base64:8]'
            : '[local]-[hash:base64:6]',
        },
      },
    },
    extract: true,
  },

  pluginOptions: {
    vite: {
      /**
       * deprecated since v0.2.2. we can auto-resolve alias from vue.config.js
       * @ is setted by the plugin, you can set others used in your projects, like @components
       * Record<string, string>
       * @default {}
       */
      //alias,
      /**
       * Plugin[]
       * @default []
       */
      //plugins: [], // other vite plugins list, will be merge into this plugin\'s underlying vite.config.ts
      //plugins: [babel(require('./babel.config'))],
      /**
       * you can enable jsx support by setting { jsx: true }
       * @see https://github.com/underfin/vite-plugin-vue2#options
       * @default {}
       */
      vitePluginVue2Options: {},
      /**
       * Vite UserConfig.optimizeDeps options
       * @default {}
       */
      optimizeDeps: {},
    },
  },
}
