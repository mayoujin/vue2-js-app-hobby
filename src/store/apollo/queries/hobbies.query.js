// queries.js

import { gql } from 'apollo-boost'

export const queryHobbies = gql`
  {
    hobbies @client {
      id
      hobby
    }
  }
`

export const mutationDeleteHobby = gql`
  mutation($id: ID!) {
    deleteHobby(id: $id) @client
  }
`

export const mutationAddHobby = gql`
  mutation($hobby: Hobby!) {
    addHobby(hobby: $hobby) @client {
      id
      hobby
    }
  }
`
