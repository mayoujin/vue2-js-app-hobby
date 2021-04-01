import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

import {
  HOBBIES_PICKED_SET as M_HOBBIES_PICKED_SET,
  HOBBIES_OPTIONAL_SET as M_HOBBIES_OPTIONAL_SET,
  HOBBY_DROP as M_HOBBY_DROP_BY_UUID,
  HOBBY_ADD as M_HOBBY_ADD,
  HOBBY_UPDATE_BY_UUID as M_HOBBY_UPDATE_BY_UUID,
} from './mutations.type'
import {
  HOBBY_ADD_OPTIMISTIC as A_HOBBY_ADD_OPTIMISTIC,
  HOBBY_DROP_OPTIMISTIC as A_HOBBY_DROP_OPTIMISTIC,
} from './actions.type'

import { Hobby } from '@/domain/entities/hobby'
import { createHobbyOptimistic } from '@/app/models/Optimistic'

const isEqualInstances = ({ uuid: uuidOne }, { uuid: uuidTwo }) =>
  uuidOne === uuidTwo

/**
 * @typedef {{pickedHobbies: Hobby[], optionalHobbies: Hobby[]}} State
 * @type State
 */
const state = {
  pickedHobbies: [],
  optionalHobbies: [],
}

const getters = {
  pickedHobbies(state) {
    return state.pickedHobbies
  },
  optionalHobbies(state) {
    return state.optionalHobbies
  },
}

/**
 * Actions
 */

const actions = {
  /**
   *
   * @param {State} state
   * @param {Hobby} addingHobby
   */
  [A_HOBBY_ADD_OPTIMISTIC]({ commit }, addingHobby) {
    const hobbyOptimistic = createHobbyOptimistic(addingHobby)

    commit(M_HOBBY_ADD, hobbyOptimistic)

    const rollback = () => commit(M_HOBBY_DROP_BY_UUID, hobbyOptimistic)
    const commitOptimistic = (addedHobby) => {
      commit(M_HOBBY_UPDATE_BY_UUID, {
        updatingHobby: hobbyOptimistic,
        updatedHobby: addedHobby,
      })
    }

    return {
      commit: commitOptimistic,
      rollback,
    }
  },

  /**
   *
   * @param {State} state
   * @param {Hobby} droppingHobby
   */
  [A_HOBBY_DROP_OPTIMISTIC]({ commit }, droppingHobby) {
    const hobbyOptimistic = createHobbyOptimistic(droppingHobby)
    commit(M_HOBBY_UPDATE_BY_UUID, {
      updatingHobby: droppingHobby,
      updatedHobby: hobbyOptimistic,
    })

    const rollback = () =>
      commit(M_HOBBY_UPDATE_BY_UUID, {
        updatingHobby: hobbyOptimistic,
        updatedHobby: droppingHobby,
      })
    const commitOptimistic = () => commit(M_HOBBY_DROP_BY_UUID, hobbyOptimistic)

    return {
      commit: commitOptimistic,
      rollback,
    }
  },
}

/**
 * Mutations
 */
const mutations = {
  /**
   *
   * @param {State} state
   * @param {Hobby[]} pickedHobbies
   */
  [M_HOBBIES_PICKED_SET](state, pickedHobbies) {
    state.pickedHobbies = pickedHobbies
  },
  /**
   *
   * @param {State} state
   * @param {Hobby[]} optionalHobbies
   */
  [M_HOBBIES_OPTIONAL_SET](state, optionalHobbies) {
    state.optionalHobbies = optionalHobbies
  },
  /**
   *
   * @param {State} state
   * @param {Hobby} addedHobby
   */
  [M_HOBBY_ADD](state, addedHobby) {
    const existingHobbyIndex = state.pickedHobbies.findIndex((hobby) =>
      isEqualInstances(hobby, addedHobby),
    )
    const index =
      existingHobbyIndex === -1
        ? state.pickedHobbies.length
        : existingHobbyIndex

    Vue.set(state.pickedHobbies, index, addedHobby)
  },
  /**
   *
   * @param {State} state
   * @param {Hobby|HobbyOptimistic} droppedHobby
   */
  [M_HOBBY_DROP_BY_UUID](state, droppedHobby) {
    state.pickedHobbies = state.pickedHobbies.filter(
      (hobby) => isEqualInstances(hobby, droppedHobby) === false,
    )
  },
  /**
   *
   * @param {State} state
   * @param {Hobby|HobbyOptimistic} updatingHobby
   * @param {Hobby|HobbyOptimistic} updatedHobby
   */
  [M_HOBBY_UPDATE_BY_UUID](state, { updatingHobby, updatedHobby }) {
    const existingHobbyIndex = state.pickedHobbies.findIndex((hobby) =>
      isEqualInstances(hobby, updatingHobby),
    )
    Vue.set(state.pickedHobbies, existingHobbyIndex, updatedHobby)
  },
}

export const create = () =>
  new Store({
    actions,
    getters,
    state,
    mutations,
  })
