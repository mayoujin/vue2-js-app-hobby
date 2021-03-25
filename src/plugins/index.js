import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAsyncManager from 'vue-async-manager'
import { ErrorBoundary } from 'vue-error-boundary/src'

import { install as installStorage } from '@/plugins/storage'

const plugins = [VueRouter, [VueAsyncManager, { mode: 'hidden' }]]

Vue.component('ErrorBoundary', ErrorBoundary)

plugins.forEach((args) => Vue.use.apply(Vue, [].concat(args)))

export const install = ({ store }) => {
  installStorage(store)
}
