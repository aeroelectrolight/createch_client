/* modules settings */
export const state = {
  couleurs: [],
  fonctions: [],
  groupes: [],
  conventions: [],
  lieux: [],
  personnels: []
}

export const getters = {
  /* getters settings */
  couleurs: state => state.couleurs,
  fonctions: state => state.fonctions,
  groupes: state => state.groupes,
  conventions: state => state.conventions,
  lieux: state => state.lieux,
  personnels: state => state.personnels
}

export const mutations = {
  /* COULEURS */
  ADD_COULEURS (state, couleurs) {
    state.couleurs.push(...couleurs)
  },
  ADD_COULEUR (state, couleur) {
    state.couleurs.push(couleur[0])
  },
  MODIFY_COULEUR (state, couleur) {
    let index = state.couleurs.findIndex((c) => c.id === couleur.id)
    state.couleurs.splice(index, 1, couleur)
  },
  DELETE_COULEUR (state, id) {
    let index = state.couleurs.findIndex((c) => c.id === id)
    state.couleurs.splice(index, 1)
  },
  /* FONCTIONS */
  ADD_FONCTIONS (state, fonctions) {
    state.fonctions.push(...fonctions)
  },
  ADD_FONCTION (state, fonction) {
    state.fonctions.push(fonction[0])
  },
  MODIFY_FONCTION (state, fonction) {
    let index = state.fonctions.findIndex((c) => c.id === fonction.id)
    state.fonctions.splice(index, 1, fonction)
  },
  DELETE_FONCTION (state, id) {
    let index = state.fonctions.findIndex((c) => c.id === id)
    state.fonctions.splice(index, 1)
  },
  /* GROUPES */
  ADD_GROUPES (state, groupes) {
    state.groupes.push(...groupes)
  },
  ADD_GROUPE (state, groupe) {
    state.groupes.push(groupe[0])
  },
  MODIFY_GROUPE (state, groupe) {
    let index = state.groupes.findIndex((g) => g.id === groupe.id)
    state.groupes.splice(index, 1, groupe)
  },
  DELETE_GROUPE (state, id) {
    let index = state.groupes.findIndex((g) => g.id === id)
    state.groupes.splice(index, 1)
  },
  /* CONVENTIONS */
  ADD_CONVENTIONS (state, conventions) {
    state.conventions.push(...conventions)
  },
  ADD_CONVENTION (state, convention) {
    state.conventions.push(convention[0])
  },
  MODIFY_CONVENTION (state, convention) {
    let index = state.conventions.findIndex((c) => c.id === convention.id)
    state.conventions.splice(index, 1, convention)
  },
  DELETE_CONVENTION (state, id) {
    let index = state.conventions.findIndex((c) => c.id === id)
    state.conventions.splice(index, 1)
  },
  /* LIEUX */
  ADD_LIEUX (state, lieux) {
    state.lieux.push(...lieux)
  },
  ADD_LIEU (state, lieu) {
    state.lieux.push(lieu[0])
  },
  MODIFY_LIEU (state, lieu) {
    let index = state.lieux.findIndex((l) => l.id === lieu.id)
    state.lieux.splice(index, 1, lieu)
  },
  DELETE_LIEU (state, id) {
    let index = state.lieux.findIndex((l) => l.id === id)
    state.lieux.splice(index, 1)
  },
  /* PERSONNELS */
  ADD_PERSONNELS (state, personnels) {
    state.personnels.push(...personnels)
  },
  ADD_PERSONNEL (state, personnel) {
    state.personnels.push(personnel[0])
  },
  MODIFY_PERSONNEL (state, personnel) {
    let index = state.personnels.findIndex((p) => p.id === personnel.id)
    state.personnels.splice(index, 1, personnel)
  },
  DELETE_PERSONNEL (state, id) {
    let index = state.personnels.findIndex((p) => p.id === id)
    state.personnels.splice(index, 1)
  }
}

export default {
  state,
  getters,
  mutations
}
