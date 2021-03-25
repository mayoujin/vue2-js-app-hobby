/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ServiceException
 */
export default class ServiceException extends Error {
  /**
   * @private
   * @member {number}
   */
  #code

  /**
   * @private
   * @member {*}
   */
  #data

  /**
   * Ошибка вызвавшая exception
   * @private
   * @member {Object}
   */
  #reason

  /**
   *
   * @param {string} [message]
   * @param {number} [code]
   * @param {*} [data]
   * @param {Object} [reason]
   * @constructs ApiHttpClientException
   */
  constructor(message, { code = 0, data, reason } = {}) {
    super(message)
    this.name = this.constructor.name
    this.#code = code
    this.#data = data
    this.#reason = reason
  }

  /**
   * Данные пришедшие в ответе в
   * @public
   * @readonly
   * @member {*} ApiHttpClientException#data
   */
  get data() {
    return this.#data
  }

  /**
   * HTTP status code
   * @public
   * @readonly
   * @member {number} ApiHttpClientException#code
   */
  get code() {
    return this.#code
  }

  /**
   * Дополнительная информация о причине ошибки
   * @public
   * @readonly
   * @member {Object} ApiHttpClientException#reason
   */
  get reason() {
    return this.#reason
  }
}
