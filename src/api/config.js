export const API_BASE_URI = process.env.VUE_APP_API_BASE_URL
export const validHttpStatuses = [422]
export const invalidHttpStatuses = []

/**
 * @typedef { import('axios').AxiosRequestConfig } AxiosRequestConfig
 */

/**
 * Основное условие проверки валидности http-статуса
 * используемое при разборе ответа сервера в axios
 *
 * @param {number} status
 * @return {boolean}
 */
const isValidStatus = (status) =>
  (status < 400 || validHttpStatuses.includes(status)) &&
  invalidHttpStatuses.includes(status) === false

/**
 * Дефолтный конфиг для инстанса Axios,
 * который будет использоваться в клиенте.
 * (Чтобы не влиять на глобальные настройки axios)
 * @see https://github.com/axios/axios#config-defaults
 * @param {AxiosRequestConfig} [options={}]
 * @return {AxiosRequestConfig}
 */
export const defaultConfig = (options = {}) => {
  return {
    ...options,
    validateStatus: isValidStatus,
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }
}
