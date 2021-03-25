import Vue from 'vue'
import { storage } from '@/store/storage'

export const install = () => {
  Vue.mixin({
    beforeCreate() {
      this.$storage = storage
    },
  })
}
