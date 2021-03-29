import Vue from 'vue'
import VueAsyncManager from 'vue-async-manager'
import { ErrorBoundary } from 'vue-error-boundary/src'
import { install as installStorage } from '@/plugins/storage'

Vue.component('ErrorBoundary', ErrorBoundary)
;[[VueAsyncManager, { mode: 'hidden' }]].forEach((args) =>
  Vue.use.apply(Vue, [].concat(args)),
)

export const install = ({ store }) => {
  installStorage(store)
}

export * from './apollo-provider'
