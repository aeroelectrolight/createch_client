export const state = {
  budgets: [],
  events: [],
  lines: []
}

export const getters = {
  budgets: state => state.budgets,
  events: state => state.events
}

export const mutations = {
  /* BUDGETS */
  ADD_BUDGETS (state, budgets) {
    state.budgets.push(...budgets)
  },
  ADD_BUDGET (state, budget) {
    state.budgets.push(budget)
  },
  MODIFY_BUDGET (state, budget) {
    let index = state.budgets.findIndex((p) => p.id === budget.id)
    state.budgets.splice(index, 1, budget)
  },
  DELETE_BUDGET (state, id) {
    let index = state.budgets.findIndex((p) => p.id === id)
    state.budgets.splice(index, 1)
  },
  /* EVENTS */
  ADD_EVENTS (state, events) {
    state.events.push(...events)
  },
  ADD_EVENT (state, event) {
    state.events.push(event[0])
  },
  MODIFY_EVENT (state, event) {
    let index = state.events.findIndex((p) => p.id === event.id)
    state.events.splice(index, 1, event)
  },
  DELETE_EVENT (state, id) {
    let index = state.events.findIndex((p) => p.id === id)
    state.events.splice(index, 1)
  },
  CLEAR_EVENTS (state) {
    state.events = []
  },
  /* LINES */
  ADD_LINE (state, line) {
    state.lines.push(line)
  },
  ADD_LINES (state, lines) {
    state.lines.push(...lines)
  },
  DELETE_LINE (state, line) {
    let index = state.lines.findIndex((l) => l.id === line.id)
    state.lines.splice(index, 1)
  }
}

export default {
  state,
  getters,
  mutations
}
