/**
 * Apollo client create and initialize.
 */
import ApolloClient from 'apollo-boost'

import { createCache } from './cache'
import link from './links'

export const cache = createCache()

export const createApolloClient = (options = {}) =>
  new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
    ...options,
  })
