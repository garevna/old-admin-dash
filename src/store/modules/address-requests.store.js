const {
  getData,
  deleteData,
  patchData
} = require('@/helpers').default

const errors = require('@/config/errors').default.address
const messages = require('@/config/messages').default.address
const endpoints = {
  connection: require('@/config/endpoints').default.connection,
  connectivity: require('@/config/endpoints').default.connectivity
}

const state = {
  types: ['connection', 'connectivity'],
  type: 'connection',
  tickets: []
}

const mutations = {

  UPDATE_TICKET_TYPE: (state, type) => {
    const index = state.types.indexOf(type)
    state.type = index !== -1 ? type : state.types[0]
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
    const response = await getData(endpoints[state.type].get)

    if (!response.error) {
      const tickets = response.data
        .map(item => Object.assign({}, item, {
          createdAt: item.createdAt ? (new Date(item.createdAt - 0)).toISOString().slice(0, 10) : '',
          footprint: item.locatedInPolygon,
          distanceFromFootprint: item.distanceToWell
        }))
      commit('TICKETS', tickets)
    } else {
      commit('ERROR', errors.get, { root: true })
    }
  },

  async DELETE_TICKET ({ commit }, id) {
    const response = await deleteData(`${endpoints[state.type].delete}/${id}`)
    if (response.error) {
      commit('ERROR', errors.delete, { root: true })
    } else {
      commit('MESSAGE', messages.delete, { root: true })
      commit('REMOVE', id)
    }

    return response
  },

  async SEND_MESSAGE_WITH_CURRENT_TICKET (context, payload) {
    const response = await patchData(`${endpoints[state.type].history}/${payload.id}`, payload.historyElement)
    if (response.error) {
      context.commit('ERROR', errors.history, { root: true })
    } else {
      context.commit('MESSAGE', messages.history, { root: true })
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
