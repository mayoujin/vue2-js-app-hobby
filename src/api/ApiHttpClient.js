import axios from 'axios'

import { ApiHttpClientException, AbortException } from './ApiExceptions'
import { defaultConfig } from './config'

/**
 * @typedef { import('axios').AxiosInstance } AxiosInstance
 * @typedef { import('FrontendApiRequest') } FrontendApiRequest
 * @typedef { import('axios').AxiosRequestConfig } AxiosRequestConfig
 */

/**
 * Инстанс транспорта axios для http-клиента по-умолчанию
 * @param {AxiosRequestConfig} [options={}]
 * @return {AxiosInstance}
 */
export const defaultTransportInstance = (options = {}) =>
  axios.create(defaultConfig(options))

/**
 * Билдит конфиг реквеста для транспорта из FrontendApiRequest
 *
 * @param { FrontendApiRequest } request
 * @return {AxiosRequestConfig}
 */
const buildAxiosRequest = (request) => {
  const { operation: url, payload: data, signal, method } = request

  if (!url) {
    throw new ApiHttpClientException('Empty url or pathname')
  }

  const options = {
    cancelToken: null,
  }
  // если передан сигнал для прерывания запроса
  // создаёт CancelToken для Axios-запроса
  if (signal) {
    /**
     * @type {{ cancel, token }}
     */
    const { cancel, token } = axios.CancelToken.source()
    signal.onabort = () => {
      cancel()
    }
    options.cancelToken = token
  }

  return {
    url,
    method,
    ...(data && { data }),
    ...options,
  }
}

/**
 * Конвертирует ошибку от транспорта в исключение ApiHttpClientException
 *
 * @param {Error} exception
 * @throw {ApiHttpClientException|Error}
 */
const processTransportException = (exception) => {
  const { isAxiosError, message } = exception

  // If non-axios exception
  if (isAxiosError === false) {
    return new ApiHttpClientException(message, { reason: exception })
  }

  if (axios.isCancel(exception)) {
    return new AbortException(message)
  }

  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  const {
    response,
    request,
    config: { url, data: requestData, method },
  } = exception

  const reason = { url, data: requestData, method }

  if (response) {
    const { data, status } = response

    return new ApiHttpClientException(message, {
      data,
      code: status,
      reason,
    })
  }

  // The request was made but no response was received
  // `error.request` is an instance of XMLHttpRequest in the browser
  if (request) {
    return new ApiHttpClientException(message, {
      code: 0,
      reason,
    })
  }

  // Something happened in setting up the request that triggered an Error
  return new ApiHttpClientException(message, {
    code: 0,
    reason: exception,
  })
}

/**
 * Обрабатывает ответа Axios и возвращает целевые данные для HttpApiClient
 * @typedef { import('axios').AxiosResponse } TransportResponse
 * @param {TransportResponse} transportResponse
 * @return {*}
 */
const processTransportResponse = (transportResponse) => {
  const { data } = transportResponse
  return data
}

/**
 * @class ApiHttpClient
 */
class ApiHttpClient {
  /**
   * Transport client instance
   * @private
   * @member {AxiosInstance}
   */
  #transport

  /**
   * @param {AxiosInstance} [transport=defaultTransportInstance]
   * @constructs ApiHttpClient
   */
  constructor(transport = defaultTransportInstance()) {
    this.#transport = transport
  }

  /**
   * @public
   * @async
   * @method ApiHttpClient#request
   * @param {FrontendApiRequest} request
   *
   * @throw {ApiHttpClientException|Error}
   * @return {Promise<*>}
   */
  async request(request) {
    const requestConfig = buildAxiosRequest(request)
    try {
      const response = await this.#transport.request(requestConfig)
      return processTransportResponse(response)
    } catch (e) {
      const exception = processTransportException(e)
      throw exception
    }
  }
}

/**
 * Creates ApiHttpClient instance
 *
 * @param {AxiosInstance} [transport] Transport client instance
 * @return {ApiHttpClient}
 */
export const create = (transport = defaultTransportInstance()) =>
  new ApiHttpClient(transport)

export default ApiHttpClient
