import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.js'
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store({
    state: {
      all: null
    },
    modules: {
      auth
    }
  })
}
