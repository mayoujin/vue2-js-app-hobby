export * from './either'
/**
 *
 * @param exception
 * @throw {Error}
 * @return void
 */
export const throwAsyncException = async (exception) => {
  setTimeout(() => throw exception)
}

export const decorateWithProxy = (target, delegate) => {
  const proxyHandler = {
    get(target, propKey) {
      const realTarget = target[propKey]
        ? target
        : delegate
        ? delegate
        : undefined
      const prop = realTarget ? realTarget[propKey] : undefined
      if (typeof prop !== 'function') {
        return prop
      }
      return function(...args) {
        return prop.apply(realTarget, args)
      }
    },
  }
  return new Proxy(target, proxyHandler)
}
