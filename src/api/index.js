export { ApiHttpClientException, AbortException } from './ApiExceptions'
import { create, defaultTransportInstance } from './ApiHttpClient'
import { API_BASE_URI } from './config'

export const apiClient = create(
  defaultTransportInstance({ baseURL: API_BASE_URI }),
)
