const { getData, postData, putData, deleteData } = require('@/helpers').default

const errors = require('@/config/errors').default.tariff
const messages = require('@/config/messages').default.tariff
const endpoints = require('@/config/endpoints').default.tariff

const state = {
  tariffs: {},
  tariffSchema: require('@/config/tariffSchema').default
}

const mutations = {
  UPDATE_TARIFFS: (state, payload) => {
    state.tariffs = payload
  },
  UPDATE_TARIFF_BY_ID: (state, payload) => {
    const index = state.tariffs.findIndex(item => item._id === payload.id)
    state.tariffs.splice(index, 1, payload.value)
  },
  ADD_TARIFF: (state, payload) => {
    state.tariffs.push(payload)
  },
  REMOVE_TARIFF_BY_ID: (state, id) => {
    const index = state.tariffs.findIndex(item => item._id === id)
    state.tariffs.splice(index, 1)
  }
}

const actions = {
  async GET_TARIFFS ({ state, commit }) {
    const response = await getData(endpoints.get)

    if (!response.error) {
      commit('UPDATE_TARIFFS', response.data)
    } else {
      commit('ERROR', errors.get, { root: true })
    }
    return response.data
  },

  async UPDATE_TARIFF ({ state, commit }, id) {
    const data = state.tariffs.find(item => item._id === id)
    const response = await putData(`${endpoints.put}/${id}`, data)

    if (!response.error) {
      commit('MESSAGE', messages.update, { root: true })
    } else {
      commit('ERROR', errors.update, { root: true })
    }
    return response
  },

  async CREATE_TARIFF ({ state, commit }) {
    const tariff = Object.assign({}, ...Object.keys(state.tariffSchema).map(propName => ({ [propName]: state.tariffSchema[propName].value })))

    const response = await postData(endpoints.post, tariff)

    if (!response.error) {
      commit('ADD_TARIFF', { id: response.data, value: Object.assign({}, state.tariffSchema) })
      commit('MESSAGE', messages.create, { root: true })
      return Object.assign(tariff, { _id: response.data })
    }
    commit('ERROR', errors.create, { root: true })
    return null
  },

  async DELETE_TARIFF ({ state, commit }, id) {
    if (!id) {
      commit('ERROR', errors.id, { root: true })
      return
    }
    const response = await deleteData(`${endpoints.delete}/${id}`)

    if (!response.error) {
      commit('REMOVE_TARIFF_BY_ID', id)
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
