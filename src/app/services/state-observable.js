import Vue from 'vue'

export const createTaskStateObservable = () =>
  Vue.observable({
    status: 'standby',
    result: null,
    error: null,
  })
