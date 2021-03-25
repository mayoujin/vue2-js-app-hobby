const { isProd } = require('./utils')

/**
 * @typedef { import("webpack-chain") } ChainableWebpackConfig
 * @typedef { function(config: ChainableWebpackConfig): void } ChainWebpackFunction
 * @property {ChainableWebpackConfig} config
 */

/**
 * @type ChainWebpackFunction
 */
const configEnableProductionSourceMap = (config) => {
  config.devtool('source-map')
  config.optimization.minimize(false)

  config.plugin('define').tap((definitions) => {
    definitions[0]['__VUE_PROD_DEVTOOLS__'] = 'true'
    return definitions
  })
}

/**
 * @type ChainWebpackFunction
 */
const rulePosthtmlLoader = (config) => {
  config.module
    .rule('htm')
    .test(/\.(htm)$/)
    .use('posthtml-loader')
    .loader('posthtml-loader')
    .end()
}

/**
 * @type ChainWebpackFunction
 */
const pluginDeleteTsChecker = (config) => {
  config.plugins.delete('fork-ts-checker')
}

/**
 * Disables linting
 *
 * @type ChainWebpackFunction
 */
const ruleEslintDisable = (config) => {
  config.module.rules.delete('eslint')
}

/**
 *
 * @type ChainWebpackFunction[]
 */
const configChainsList = [pluginDeleteTsChecker, ruleEslintDisable].concat(
  isProd() ? [] : configEnableProductionSourceMap,
)

/**
 *
 * @type ChainWebpackFunction
 */
const chainWebpack = (config) =>
  configChainsList.forEach((handler) => {
    handler(config)
  })

module.exports = chainWebpack