import Vue from 'vue'

import { install as installPlugins, apolloProvider } from '@/plugins'
import '@/.boot'

import router from '@/router'
import store from '@/store'

import App from '@/App.vue'
import '@/styles/index.pcss'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
})

installPlugins({ app, router, store })

app.$mount(process.env.VUE_APP_MOUNT_POINT)
