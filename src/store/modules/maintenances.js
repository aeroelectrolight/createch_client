import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
let intro = ''

export const state = {
  verifications: []
}

export const getters = {
  verifications: (state) => state.verifications
}

export const actions = {
  /* VERIFICATIONS */
  getVerifications (store) {
    return Vue.http.get(intro + '/verifications').then((response) => {
      store.commit('ADD_VERIFICATIONS', response.data)
    })
  },
  addVerification: function (store, verification) {
    return Vue.http.post(intro + '/verifications', verification).then((response) => {
      store.commit('ADD_VERIFICATION', response.data)
      return response
    })
  },
  modifyVerification: function (store, {id, verification}) {
    return Vue.http.put(intro + '/verifications/' + id, verification).then((response) => {
      store.commit('MODIFY_VERIFICATION', response.data)
      return response
    })
  },
  deleteVerification: function (store, id) {
    return Vue.http.delete(intro + '/verifications/' + id).then((response) => {
      store.commit('DELETE_VERIFICATION', id)
    })
  }
}

export const mutations = {
  /* VERIFICATIONS */
  ADD_VERIFICATIONS (state, verifications) {
    state.verifications.push(...verifications)
  },
  ADD_VERIFICATION (state, verification) {
    state.verifications.push(verification)
  },
  MODIFY_VERIFICATION (state, verification) {
    let index = state.verifications.findIndex((v) => v.id === verification.id)
    state.verifications.splice(index, 1, verification)
  },
  DELETE_VERIFICATION (state, id) {
    let index = state.verifications.findIndex((v) => v.id === id)
    state.verifications.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
