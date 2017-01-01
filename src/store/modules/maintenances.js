import axios from 'axios'

axios.defaults.baseURL = ''

let intro = ''

export const state = {
  verifications: [],
  maintenances: []
}

export const getters = {
  verifications: (state) => state.verifications,
  maintenances: (state) => state.maintenances
}

export const actions = {
  /* VERIFICATIONS */
  getVerifications (store) {
    return axios.get(intro + '/verifications').then((response) => {
      store.commit('ADD_VERIFICATIONS', response.data)
    })
  },
  addVerification: function (store, verification) {
    return axios.post(intro + '/verifications', verification).then((response) => {
      console.log(response)
      store.commit('ADD_VERIFICATION', response.data)
      return response
    })
  },
  modifyVerification: function (store, {id, verification}) {
    return axios.put(intro + '/verifications/' + id, verification).then((response) => {
      store.commit('MODIFY_VERIFICATION', response.data)
      return response
    })
  },
  deleteVerification: function (store, id) {
    return axios.delete(intro + '/verifications/' + id).then((response) => {
      store.commit('DELETE_VERIFICATION', id)
    })
  },
  /* MAINTENANCES */
  getMaintenances (store) {
    return axios.get(intro + '/maintenances').then((response) => {
      store.commit('ADD_MAINTENANCES', response.data)
    })
  },
  addMaintenance: function (store, maintenance) {
    return axios.post(intro + '/maintenances', maintenance).then((response) => {
      store.commit('ADD_MAINTENANCE', response.data)
      return response
    })
  },
  modifyMaintenance: function (store, {id, maintenance}) {
    return axios.put(intro + '/maintenances/' + id, maintenance).then((response) => {
      store.commit('MODIFY_MAINTENANCE', response.data)
      return response
    })
  },
  deleteMaintenance: function (store, id) {
    return axios.delete(intro + '/maintenances/' + id).then((response) => {
      store.commit('DELETE_MAINTENANCE', id)
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
  },
  /* MAINTENANCES */
  ADD_MAINTENANCES (state, maintenances) {
    state.maintenances.push(...maintenances)
  },
  ADD_MAINTENANCE (state, maintenance) {
    state.maintenances.push(maintenance)
  },
  MODIFY_MAINTENANCE (state, maintenance) {
    let index = state.maintenances.findIndex((v) => v.id === maintenance.id)
    state.maintenances.splice(index, 1, maintenance)
  },
  DELETE_MAINTENANCE (state, id) {
    let index = state.maintenances.findIndex((v) => v.id === id)
    state.maintenances.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
