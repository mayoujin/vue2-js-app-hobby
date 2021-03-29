import {
  HOBBIES_OPTIONAL_SET,
  HOBBIES_PICKED_SET,
} from '@/store/mutations.type'
import {
  HOBBY_ADD_OPTIMISTIC,
  HOBBY_DROP_OPTIMISTIC,
} from '@/store/actions.type'

import { ok, err, Result } from 'resulty'
import { throwAsyncException } from '@/utils'

import { Hobby } from '@/components/HobbyList/types'
import { hobby as hobbyServices } from '@/app/services/api'

import { mutationAddHobby } from '@/store/apollo'
import { apolloClient } from 'boot/apollo-client'

export const createStorage = (store) => ({
  getters: store.getters,

  actions: {
    /**
     *
     * @return {Promise<Result<Error|Hobby[]>>}
     */
    async fetchPickedHobbies() {
      try {
        const hobbies = await hobbyServices.getPickedHobbies()
        store.commit(HOBBIES_PICKED_SET, hobbies)
        return ok(hobbies)
      } catch (e) {
        throwAsyncException(e)
        return err(err)
      }
    },
    /**
     *
     * @return {Promise<Result<Error|Hobby[]>>}
     */
    async fetchOptionalHobbies() {
      try {
        const hobbies = await hobbyServices.getOptionalHobbies()
        store.commit(HOBBIES_OPTIONAL_SET, hobbies)
        return ok(hobbies)
      } catch (error) {
        throwAsyncException(error)
        return err(error)
      }
    },

    /**
     *
     * @param {Hobby} hobby
     * @return {Promise<Result<Hobby, Error>>}
     */
    async pickHobby(hobby) {
      const { commit, rollback } = await store.dispatch(
        HOBBY_ADD_OPTIMISTIC,
        hobby,
      )
      try {
        const addedHobby = await hobbyServices.pickHobby(hobby)
        commit(addedHobby)
        return ok(addedHobby)
      } catch (error) {
        rollback()
        throwAsyncException(error)
        return err(error)
      }
    },
    /**
     *
     * @param {Hobby} hobby
     * @return {Promise<Result<Hobby, Error>>}
     */
    async dropHobby(hobby) {
      const { commit, rollback } = await store.dispatch(
        HOBBY_DROP_OPTIMISTIC,
        hobby,
      )
      try {
        await hobbyServices.dropHobby(hobby)
        commit()
        return ok(true)
      } catch (error) {
        rollback()
        throwAsyncException(error)
        return err(error)
      }
    },
    /**
     *
     * @param {{hobby?: string}} hobbyData
     * @param callService
     * @return {Promise<Result<Hobby, Error>>}
     */
    async addNewHobby(hobbyData, callService) {
      const { commit, rollback } = await store.dispatch(
        HOBBY_ADD_OPTIMISTIC,
        new Hobby(hobbyData),
      )
      try {
        const hobby = await callService(hobbyData)
        commit(hobby)

        apolloClient.mutate({
          mutation: mutationAddHobby,
          variables: { hobby },
        })

        return ok(hobby)
      } catch (error) {
        rollback()
        throwAsyncException(error)
        return err(error)
      }
    },
  },
})

//const StorageService = class {
//  #storage
//  constructor(delegate, { storage }) {
//    this.#storage = storage
//  }
//  get storage() {
//    return this.#storage
//  }
//}
//
//export const withStorageService = () => {
//  return StorageService
//}
