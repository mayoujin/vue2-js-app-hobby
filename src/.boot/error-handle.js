import Vue from 'vue'
import errorServiceSingleton from '@/infra/services/error'

Vue.config.errorHandler = (error) =>
  errorServiceSingleton.constructor.onError(error)
