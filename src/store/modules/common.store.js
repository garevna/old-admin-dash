const { getData, deleteData, patchData } = require('@/helpers').default

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
    const response = await getData('ticket/common')

    if (!response.error) {
      const tickets = response.data
        .map((item, index) => Object.assign({}, item, {
          createdAt: context.getters.getTicketDate(item),
          rsp: context.getters.getClientById(item.name) ? context.getters.getClientById(item.name)
            : context.getters.getClientByIndex(0)
        }))
      context.commit('TICKETS', tickets)
    } else {
      context.commit('ERROR', {
        error: true,
        errorType: 'Reading tikets',
        errorMessage: 'Process failed...'
      }, { root: true })
    }
  },

  async SEND_MESSAGE (context, payload) {
    const response = await patchData(`ticket/common/set-history/${payload.id}`, payload.historyElement)

    if (response.error) {
      context.commit('ERROR', {
        error: true,
        errorType: 'Sending message',
        errorMessage: 'Message has not been delivered...'
      }, { root: true })
    } else {
      context.commit('MESSAGE', {
        message: true,
        messageType: 'Sending message',
        messageText: 'Message has been delivered'
      }, { root: true })
    }
  },

  async REMOVE_TIKET (context, payload) {
    const response = await deleteData(`ticket/common/${payload.id}`)

    if (response.error) {
      context.commit('ERROR', {
        error: true,
        errorType: 'Delete ticket',
        errorMessage: 'Process failed...'
      }, { root: true })
    } else {
      context.commit('MESSAGE', {
        message: true,
        messageType: 'Delete ticket',
        messageText: 'Ticket has been removed'
      }, { root: true })
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
