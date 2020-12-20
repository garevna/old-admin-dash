/* eslint-disable no-unused-vars */

const {
  getData,
  postData,
  putData,
  deleteData,
  patchData
} = require('@/helpers').default

const state = {
  types: ['connection-request', 'connectivity-research'],
  names: ['ticketsCommon', 'connectivityResearchTickets'],
  type: 'connection-request',
  dataName: 'ticketsCommon',
  tickets: []
}

const mutations = {

  UPDATE_TICKET_TYPE: (state, type) => {
    const index = state.types.indexOf(type)
    state.type = index !== -1 ? type : state.types[0]
    state.dataName = index !== -1 ? state.names[index] : state.names[0]
  },

  TICKETS: (state, payload) => {
    state.tickets = payload
  },

  REMOVE: (state, id) => {
    const index = state.tickets.findIndex(item => item._id === id)
    if (index !== -1) {
      state.tickets.splice(index, 1)
    }
  }
}

const actions = {

  async GET_TICKETS ({ state, commit }) {
    const response = await getData(`ticket/${state.type}`)

    if (!response.error) {
      const tickets = response.data
        .map(item => Object.assign({}, item, {
          createdAt: item.createdAt ? (new Date(item.createdAt - 0)).toISOString().slice(0, 10) : '',
          footprint: item.locatedInPolygon,
          distanceFromFootprint: item.distanceToWell
        }))
      commit('TICKETS', tickets)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Reading tikets',
        errorMessage: 'Process failed...'
      }, { root: true })
    }
  },

  async DELETE_TICKET ({ commit }, id) {
    const response = await deleteData(`ticket/${state.type}/${id}`)
    if (response.error) {
      commit('ERROR', {
        error: true,
        errorType: 'Delete ticket',
        errorMessage: 'Operation failed'
      }, { root: true })
    } else {
      commit('MESSAGE', {
        message: true,
        messageType: 'Delete ticket',
        messageText: 'Ticket was removed forever'
      }, { root: true })
      commit('REMOVE', id)
    }

    return response
  },

  async SEND_MESSAGE_WITH_CURRENT_TICKET (context, payload) {
    const response = await patchData(`ticket/${state.type}/${payload.id}`, payload.historyElement)
    if (response.error) {
      context.commit('ERROR', {
        error: true,
        errorType: 'Sending message error',
        errorMessage: 'Message has not been delivered...'
      }, { root: true })
    } else {
      context.commit('MESSAGE', {
        message: true,
        messageType: 'Sending message',
        messageText: 'Message has been delivered'
      }, { root: true })
    }
    return response
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
