import { queryHobbies } from '@/store/apollo/queries/hobbies.query'

export const resolvers = {
  Mutation: {
    /**
     * @typedef { import('apollo-boost').ApolloCache } ApolloCache
     * @param _
     * @param text
     * @param {ApolloCache} cache
     * @return {{__typename: string, id: *, hobby: string|*}}
     */
    addHobby: (_, { hobby }, { cache }) => {
      const data = cache.readQuery({ query: queryHobbies })
      const newHobby = {
        __typename: 'Hobby',
        ...hobby,
      }
      data.hobbies.push(newHobby)
      cache.writeQuery({ query: queryHobbies, data })
      return newHobby
    },
  },
}
