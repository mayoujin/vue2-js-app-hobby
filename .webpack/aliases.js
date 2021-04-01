const aliases = {
  '@': 'src',
  boot: 'src/.boot',
}

const { resolve } = require('path')

const resolveAlias = (rootRelativePath, aliases) => {
  return (accumulator, name) => {
    const aliasPath = [].concat(aliases[name])
    const resolvedPath = resolve(...rootRelativePath, ...aliasPath)
    return {
      ...accumulator,
      [name]: resolvedPath,
    }
  }
}

module.exports.resolveAliases = (...dir) =>
  Object.keys(aliases).reduce(resolveAlias(dir, aliases), {})
