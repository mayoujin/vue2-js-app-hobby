import { decorateConstructorWithProxy, decorateWithProxy } from '@/utils'

export class DelegateProvider {
  /**
   * @param delegate
   */
  #delegate

  /**
   *
   * @param delegate
   */
  constructor(delegate) {
    this.#delegate = delegate
    return decorateWithProxy(this, this.#delegate)
  }

  provide() {
    return this.#delegate
  }
}

export function DecoratorAware(Decorator) {
  return decorateConstructorWithProxy(Decorator, DelegateProvider)
}
