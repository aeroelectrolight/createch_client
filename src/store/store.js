import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions/actSettings'
import * as getters from './getters/getSettings'
import settings from './modules/settings'
import events from './modules/events'
import maintenances from './modules/maintenances.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: { settings, events, maintenances }
})
