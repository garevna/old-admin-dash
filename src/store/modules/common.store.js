const { getData, deleteData, patchData } = require('@/helpers').default

const errors = require('@/config/errors').default.common
const messages = require('@/config/messages').default.common
const endpoints = require('@/config/endpoints').default.common

const state = {
  tickets: []
}

const getters = {
  getClientById (state, getters, rootState) {
    return id => rootState.rsp.find(reseller => reseller._id === id)
  },
  getClientByIndex (state, getters, rootState) {
    return index => rootState.rsp[index]
  },
  getTicketDate (state) {
    return (item) => {
      if (item.createdAt) {
        return (new Date(item.createdAt - 0)).toISOString().slice(0, 10)
      } else {
        const fakeData = Number(item.email) ? Number(item.email) : (Date.now() - Math.round(Math.random() * 30))
        return (new Date(fakeData)).toISOString().slice(0, 10)
      }
    }
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
          createdAt: context.getters.getTicketDate(item),
          rsp: context.getters.getClientById(item.name) ? context.getters.getClientById(item.name)
            : context.getters.getClientByIndex(0)
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
    } else {
      console.log(messages.history)
      context.commit('MESSAGE', messages.history, { root: true })
    }
  },

  async REMOVE_TIKET (context, payload) {
    const response = await deleteData(`${endpoints.delete}/${payload.id}`)

    if (response.error) {
      context.commit('ERROR', errors.delete, { root: true })
    } else {
      context.commit('MESSAGE', messages.delete, { root: true })
      context.commit('REMOVE_TIKET', payload.id)
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
