/* eslint-disable no-unused-vars */

const { getData, postData, putData } = require('@/helpers').default

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
      state.tickets = state.tickets.splice(index, 1)
    }
    return index !== -1
  }
}

const actions = {

  async GET_TICKETS ({ commit }) {
    const response = await getData('ticket/registration')

    console.log(response)

    if (!response.error) {
      const tickets = response.data
        .map(item => Object.assign({}, item, {
          createdAt: item.createdAt ? (new Date(item.createdAt - 0)).toISOString().slice(0, 10) : ''
        }))
      commit('TICKETS', tickets)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Reading Lead Requests',
        errorMessage: 'Process failed...'
      }, {
        root: true
      })
    }
  },

  async ACCEPT_TICKET ({ commit }, { id, payload }) {
    const response = await postData(`ticket/accept/${id}`, payload)

    console.log(response)

    if (!response.error) {
      commit('MESSAGE', {
        message: true,
        messageType: 'Accept Lead request',
        messageText: 'Success'
      }, { root: true })
      commit('REMOVE_TICKET_BY_ID', id)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Accept Lead request',
        errorMessage: 'Process failed'
      }, { root: true })
    }
  },

  async REJECT_TICKET ({ getters, commit, dispatch }, { id, payload }) {
    const response = await postData(`ticket/reject/${id}`, payload)

    console.log(response)

    if (!response.error) {
      commit('MESSAGE', {
        message: true,
        messageType: 'Reject Lead request',
        messageText: 'Success'
      }, { root: true })
      commit('REMOVE_TICKET_ID', id)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Reject Lead request',
        errorMessage: 'Process failed'
      }, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
