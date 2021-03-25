import AbortSignal from './AbortSignal'

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
export default class AbortController {
  /**
   * @member AbortSignal
   */
  #signal

  /**
   * Initialize this controller.
   */
  constructor() {
    this.#signal = new AbortSignal()
  }

  /**
   * Returns the `AbortSignal` object associated with this object.
   */
  get signal() {
    return this.#signal
  }

  /**
   * Abort and signal to any observers that the associated hobby is to be aborted.
   */
  abort() {
    const event = new CustomEvent('abort')
    this.#signal.dispatchEvent(event)
  }
}

export { AbortController }
