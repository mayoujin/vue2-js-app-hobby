import { gql } from 'apollo-boost'

export const hobbyTypeDefs = gql`
  type Hobby {
    id: ID!
    hobby: String!
  }

  type Mutation {
    deleteHobby(id: ID!): Boolean
    addHobby(hobby: String!): Hobby
  }
`
