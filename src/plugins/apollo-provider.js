import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloClient as defaultClient } from 'boot/apollo-client'

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient,
})
