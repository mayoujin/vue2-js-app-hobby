/**
 *
 */
export class FrontendApiRequest {
  /**
   * uri / pathname операции
   *
   * @private
   * @member {string} operation
   */
  #operation

  /**
   * Данные для
   *
   * @private
   * @member {object} payload
   */
  #payload

  /**
   * Сущность для управления отменой запроса
   *
   * @private
   * @member {AbortSignal} signal
   */
  #signal

  /**
   * Метод запроса
   *
   * @private
   * @member {string} method
   */
  #method = 'GET'

  /**
   * @public
   * @readonly
   * @member {string} operation
   */
  get operation() {
    return this.#operation
  }

  /**
   * @public
   * @readonly
   * @member {object} payload
   */
  get payload() {
    return this.#payload
  }

  /**
   * @public
   * @readonly
   * @member {AbortSignal} FrontendApiRequest#signal
   */
  get signal() {
    return this.#signal
  }

  /**
   * @public
   * @readonly
   * @member {AbortSignal} FrontendApiRequest#signal
   */
  get method() {
    return this.#method
  }

  /**
   * Request constructor.
   *
   * @param {string} operation
   * @param {object} [payload]
   * @param {{ signal?: AbortSignal, method?: string }} [options={}]
   * @constructs {FrontendApiRequest}
   */
  constructor(operation, payload, options = {}) {
    this.#operation = operation
    this.#payload = payload

    const { signal, method } = options
    if (signal) {
      this.#signal = signal
    }
    if (method) {
      this.#method = options.method
    }
  }
}

/**
 * Request factory.
 *
 * @param {string} operation
 * @param {object} [payload]
 * @param {{method: string}} [options={}]
 * @return {FrontendApiRequest}
 */
export const create = (operation, payload, options = {}) =>
  new FrontendApiRequest(operation, payload, options)

export default FrontendApiRequest
