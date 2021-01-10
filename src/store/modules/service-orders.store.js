const { getData, deleteData } = require('@/helpers').default

const errors = require('@/config/errors').default.serviceOrders
const messages = require('@/config/messages').default.serviceOrders
const endpoints = require('@/config/endpoints').default.serviceOrders

const state = {
  serviceOrders: {}
}

const mutations = {
  UPDATE_SERVICE_ORDERS: (state, payload) => {
    state.serviceOrders = payload
  },
  REMOVE_SERVICE_ORDER: (state, id) => {
    const ids = Object.keys(state.services).filter(item => item !== id)
    state.services = Object.assign({}, ...ids.map(item => ({ [item]: state.serviceOrders[item] })))
  }
}

const actions = {
  async GET_SERVICE_ORDERS ({ state, commit }) {
    const response = await getData(endpoints.get)
    if (!response.error) {
      commit('UPDATE_SERVICE_ORDERS', response.data)
    } else {
      commit('ERROR', errors.get, { root: true })
    }
    return response.data
  },

  async DELETE_SERVICE_ORDER ({ state, commit }, id) {
    const response = await deleteData(`${endpoints.get}/${id}`)

    if (!response.error) {
      commit('REMOVE_SERVICE', id)
      commit('MESSAGE', messages.delete, { root: true })
    } else {
      commit('ERROR', errors.delete, { root: true })
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
