const nested = require('postcss-nested')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    nested,
    autoprefixer,
  ],
}
