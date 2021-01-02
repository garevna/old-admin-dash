const { getData, postData } = require('@/helpers').default

const errors = require('@/config/errors').default.registration
const messages = require('@/config/messages').default.registration
const endpoints = require('@/config/endpoints').default.registration

const state = {
  tickets: []
}

const mutations = {
  TICKETS: (state, payload) => {
    state.tickets = payload
  },
  REMOVE_TICKET_BY_ID: (state, id) => {
    const index = state.tickets.findIndex(item => item._id === id)
    if (index !== -1) {
      state.tickets.splice(index, 1)
    }
    return index !== -1
  }
}

const actions = {

  async GET_TICKETS ({ commit }) {
    const response = await getData(endpoints.get)
    if (!response.error) {
      const tickets = response.data
        .map(item => Object.assign({}, item, {
          createdAt: item.createdAt ? (new Date(item.createdAt - 0)).toISOString().slice(0, 10) : ''
        }))
      commit('TICKETS', tickets)
    } else {
      commit('ERROR', errors.get, { root: true })
    }
  },

  async ACCEPT_TICKET (context, { id, payload }) {
    const response = await postData(`${endpoints.accept}/${id}`, payload)
    if (!response.error) {
      context.dispatch('GET_RSP', null, { root: true })
      context.commit('MESSAGE', messages.accept, { root: true })
      context.commit('REMOVE_TICKET_BY_ID', id)
    } else {
      context.commit('ERROR', errors.accept, { root: true })
    }
  },

  async REJECT_TICKET ({ getters, commit, dispatch }, { id, payload }) {
    const response = await postData(`${endpoints.reject}/${id}`, payload)
    if (!response.error) {
      commit('MESSAGE', messages.reject, { root: true })
      commit('REMOVE_TICKET_BY_ID', id)
    } else {
      commit('ERROR', errors.reject, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
