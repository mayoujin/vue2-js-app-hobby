import { decorateWithProxy } from '@/utils'

export class ProxyDecorator {
  /**
   * @param delegate
   */
  #delegate = null

  /**
   *
   * @param delegate
   * @return {*}
   */
  constructor(delegate) {
    this.#delegate = delegate
    return decorateWithProxy(this, delegate)
  }

  get delegate() {
    return this.#delegate
  }
}

export function Decorator() {
  return ProxyDecorator
}
