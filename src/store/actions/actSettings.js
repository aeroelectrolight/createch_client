/* actions settings */
import axios from 'axios'

axios.defaults.baseURL = '/api'

export const getLines = function (store) {
  let lines = [
        {compte: 'n1', nature: 'essai', nom: 'Ludovic Mercet', details: 'un super essai', montant: '220', total: '450'}
  ]
  return store.dispatch('ADD_LINES', lines)
}
/* COULEURS */
export const getCouleurs = function (store) {
  return axios.get('/couleurs').then((response) => {
    store.commit('ADD_COULEURS', response.data)
  })
}
export const addCouleur = function (store, couleur) {
  return axios.post('/couleurs', couleur).then((response) => {
    store.commit('ADD_COULEUR', response.data)
    return response
  })
}
export const modifyCouleur = function (store, {id, couleur}) {
  return axios.put('/couleurs/' + id, couleur).then((response) => {
    store.commit('MODIFY_COULEUR', response.data)
    return response
  })
}
export const deleteCouleur = function (store, id) {
  return axios.delete('/couleurs/' + id).then((response) => {
    store.commit('DELETE_COULEUR', id)
  })
}
/* FONCTIONS */
export const getFonctions = function (store) {
  return axios.get('/fonctions').then((response) => {
    store.commit('ADD_FONCTIONS', response.data)
  })
}
export const addFonction = function (store, fonction) {
  return axios.post('/fonctions', fonction).then((response) => {
    store.commit('ADD_FONCTION', response.data)
    return response
  })
}
export const modifyFonction = function (store, {id, fonction}) {
  return axios.put('/fonctions/' + id, fonction).then((response) => {
    store.commit('MODIFY_FONCTION', response.data)
    return response
  })
}
export const deleteFonction = function (store, id) {
  return axios.delete('/fonctions/' + id).then((response) => {
    store.commit('DELETE_FONCTION', id)
  })
}
/* GROUPES */
export const getGroupes = function (store) {
  return axios.get('/groupes').then((response) => {
    store.commit('ADD_GROUPES', response.data)
  })
}
export const addGroupe = function (store, groupe) {
  return axios.post('/groupes', groupe).then((response) => {
    store.commit('ADD_GROUPE', response.data)
    return response
  })
}
export const modifyGroupe = function (store, {id, groupe}) {
  return axios.put('/groupes/' + id, groupe).then((response) => {
    store.commit('MODIFY_GROUPE', response.data)
    return response
  })
}
export const deleteGroupe = function (store, id) {
  return axios.delete('/groupes/' + id).then((response) => {
    store.commit('DELETE_GROUPE', id)
  })
}
/* CONVENTIONS */
export const getConventions = function (store) {
  return axios.get('/conventions').then((response) => {
    store.commit('ADD_CONVENTIONS', response.data)
  })
}
export const addConvention = function (store, convention) {
  return axios.post('/conventions', convention).then((response) => {
    store.commit('ADD_CONVENTION', response.data)
    return response
  })
}
export const modifyConvention = function (store, {id, convention}) {
  return axios.put('/conventions/' + id, convention).then((response) => {
    store.commit('MODIFY_CONVENTION', response.data)
    return response
  })
}
export const deleteConvention = function (store, id) {
  return axios.delete('/conventions/' + id).then((response) => {
    store.commit('DELETE_CONVENTION', id)
  })
}
/* LIEUX */
export const getLieux = function (store) {
  return axios.get('/places').then((response) => {
    store.commit('ADD_LIEUX', response.data)
  })
}
export const addLieu = function (store, lieu) {
  return axios.post('/places', lieu).then((response) => {
    store.commit('ADD_LIEU', response.data)
    return response
  })
}
export const modifyLieu = function (store, {id, lieu}) {
  return axios.put('/places/' + id, lieu).then((response) => {
    store.commit('MODIFY_LIEU', response.data)
    return response
  })
}
export const deleteLieu = function (store, id) {
  return axios.delete('/places/' + id).then((response) => {
    store.commit('DELETE_LIEU', id)
  })
}
/* PERSONNELS */
export const getPersonnels = function (store) {
  return axios.get('/personnels').then((response) => {
    store.commit('ADD_PERSONNELS', response.data)
  })
}
export const addPersonnel = function (store, personnel) {
  return axios.post('/personnels', personnel).then((response) => {
    store.commit('ADD_PERSONNEL', response.data)
    return response
  })
}
export const modifyPersonnel = function (store, {id, personnel}) {
  return axios.put('/personnels/' + id, personnel).then((response) => {
    store.commit('MODIFY_PERSONNEL', response.data)
    return response
  })
}
export const deletePersonnel = function (store, id) {
  return axios.delete('/personnels/' + id).then((response) => {
    store.commit('DELETE_PERSONNEL', id)
  })
}
/* BUDGETS */
export const getBudgets = function (store) {
  return axios.get('/budgets').then((response) => {
    store.commit('ADD_BUDGETS', response.data)
  })
}
export const addBudget = function (store, budget) {
  return axios.post('/budgets', budget).then((response) => {
    store.commit('ADD_BUDGET', response.data)
    return response
  })
}
export const modifyBudget = function (store, {id, budget}) {
  return axios.put('/budgets/' + id, budget).then((response) => {
    store.commit('MODIFY_BUDGET', response.data)
    return response
  })
}
export const deleteBudget = function (store, id) {
  return axios.delete('/budgets/' + id).then((response) => {
    store.commit('DELETE_BUDGET', id)
  })
}
/* EVENTS */
export const getEvents = function (store) {
  return axios.get('/events').then((response) => {
    store.commit('ADD_EVENTS', response.data)
  })
}
export const addEvent = function (store, event) {
  return axios.post('/events', event).then((response) => {
    store.commit('ADD_EVENT', response.data)
    return response
  })
}
export const modifyEvent = function (store, {id, event}) {
  return axios.put('/events/' + id, event).then((response) => {
    store.commit('MODIFY_EVENT', response.data)
    return response
  })
}
export const deleteEvent = function (store, id) {
  return axios.delete('/events/' + id).then((response) => {
    store.commit('DELETE_EVENT', id)
  })
}
export const reloadEvent = function (store) {
  store.commit('CLEAR_EVENTS')
  return axios.get('/events').then((response) => {
    store.commit('ADD_EVENTS', response.data)
  })
}
