import Vue from 'vue'

/**
 * @typedef {{ status: string, result: *, error: * }} TaskState
 * @return {TaskState}
 */
export const createTaskStateObservable = ({ status }) =>
  Vue.observable({
    status: status ?? null,
    result: null,
    error: null,
  })
