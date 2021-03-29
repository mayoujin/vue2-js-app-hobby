/**
 * Apollo cache create and initialize
 */
import { InMemoryCache } from 'apollo-cache-inmemory'

export const createCache = () => {
  return new InMemoryCache({})
}
