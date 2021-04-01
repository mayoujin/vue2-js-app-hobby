import { DelegateProvider } from '@/app/models/DecorationWithProxy'

export * from './either'
/**
 *
 * @param exception
 * @throw {Error}
 * @return void
 */
export const throwAsyncException = async (exception) => {
  setTimeout(() => {
    throw exception
  })
}

export const decorateWithProxy = (target, delegate) => {
  const proxyHandler = {
    get(target, propKey, receiver) {
      if (propKey === 'delegate') {
        if (delegate instanceof DelegateProvider) {
          return delegate.provide()
        }
        return delegate
      }
      const realTarget = propKey in target ? target : delegate
      const propValue = realTarget ? realTarget[propKey] : undefined

      return typeof propValue === 'function'
        ? propValue.bind(target)
        : propValue
    },
    has(target, propKey, receiver) {
      if (propKey === 'delegate') {
        return true
      }
      return Reflect.has(...arguments)
    },
  }
  return new Proxy(target, proxyHandler)
}

export const decorateConstructorWithProxy = (Decorator, DelegateProvider) => {
  const proxyHandler = {
    construct(Decorator, argumentsList, newTarget) {
      return decorateWithProxy(
        new Decorator(...argumentsList),
        DelegateProvider
          ? new DelegateProvider(...argumentsList)
          : argumentsList[0],
      )
    },
  }
  return new Proxy(Decorator, proxyHandler)
}
