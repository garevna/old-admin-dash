const { getData, putData, deleteData, patchData } = require('@/helpers').default

const errors = require('@/config/errors').default.common
const messages = require('@/config/messages').default.common
const endpoints = require('@/config/endpoints').default.common

const state = {
  tickets: []
}

const getters = {
  user (state, getters, rootState) {
    return id => rootState.users.find(user => user._id === id)
  },
  userName (state, getters, rootState) {
    return id => getters.user(id) ? getters.user(id).company || getters.user(id).name : 'Unknown'
  },
  userRole (state, getters, rootState) {
    return id => getters.user(id) ? getters.user(id).role : '?'
  },
  ticketDate (state) {
    const fakeDate = Date.now() - Math.round(Math.random() * 30)
    return (item) => (new Date((item.createdAt - 0) || fakeDate)).toISOString().slice(0, 10)
  }
}

const mutations = {
  TICKETS: (state, payload) => {
    state.tickets = payload
  },
  REMOVE_TIKET: (state, id) => {
    const index = state.tickets.findIndex(ticket => ticket._id === id)
    state.tickets.splice(index, 1)
  }
}

const actions = {
  async GET_TICKETS (context) {
    const response = await getData(endpoints.get)

    if (!response.error) {
      const tickets = response.data
        .map((item, index) => Object.assign({}, item, {
          createdAt: context.getters.ticketDate(item),
          company: context.getters.userName(item.resellerId),
          role: context.getters.userRole(item.resellerId)
        }))
      context.commit('TICKETS', tickets)
    } else {
      context.commit('ERROR', errors.get, { root: true })
    }
  },

  async SEND_MESSAGE (context, payload) {
    const response = await patchData(`${endpoints.history}/${payload.id}`, payload.historyElement)

    if (response.error) {
      context.commit('ERROR', errors.history, { root: true })
      return false
    } else {
      context.commit('MESSAGE', messages.history, { root: true })
      return true
    }
  },

  async REMOVE_TIKET (context, id) {
    const response = await deleteData(`${endpoints.delete}/${id}`)

    if (response.error) {
      context.commit('ERROR', errors.delete, { root: true })
    } else {
      context.commit('MESSAGE', messages.delete, { root: true })
      context.commit('REMOVE_TIKET', id)
    }
  },

  async FIX_DB_ERRORS (context) {
    const tickets = (await getData(endpoints.get)).data

    for (const ticket of tickets) {
      if (!ticket.resellerId || !context.rootState.rsp.find(item => item._id === ticket.resellerId)) {
        const resellerId = context.rootState.rsp[Math.round(Math.random() * (context.rootState.rsp.length - 1))]
        await putData(`${endpoints.put}/${ticket._id}`, Object.assign(ticket, { resellerId }))
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
