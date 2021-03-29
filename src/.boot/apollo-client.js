import { createApolloClient, cache } from '@/api/apollo'
import { hobbyTypeDefs, resolvers, state } from '@/store/apollo'

cache.writeData(state)

export const apolloClient = createApolloClient({
  typeDefs: hobbyTypeDefs,
  resolvers,
})
