/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiHttpClientException
 */
export default class ApiHttpClientException extends Error {
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
   * @constructs Service
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
   * @member {*} Service#data
   */
  get data() {
    return this.#data
  }

  /**
   * HTTP status code
   * @public
   * @readonly
   * @member {number} Service#code
   */
  get code() {
    return this.#code
  }

  /**
   * Дополнительная информация о причине ошибки
   * @public
   * @readonly
   * @member {Object} Service#reason
   */
  get reason() {
    return this.#reason
  }
}
