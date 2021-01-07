import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

const { getData } = require('@/helpers').default

const errors = require('@/config/errors').default.users
const endpoints = require('@/config/endpoints').default.users

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    error: null,
    errorMessage: '',
    errorType: '',
    message: null,
    messageType: '',
    messageText: ''
  },
  modules,
  getters: {
    getUserById: (state) => (id) => state.users.find(user => user._id === id) || {},
    rsp: (state) => state.users.filter(user => user.role === 'RSP'),
    corporateClient: (state) => state.users.filter(user => user.role === 'Corporate partner')
  },
  mutations: {
    UPDATE_USERS (state, payload) {
      state.users = payload
    },
    ERROR (state, payload) {
      if (!payload) {
        state.error = false
        state.errorType = ''
        state.errorMessage = ''
      } else {
        state.error = payload.error
        state.errorType = payload.errorType
        state.errorMessage = payload.errorMessage
      }
    },
    MESSAGE (state, payload) {
      if (!payload) {
        state.message = false
        state.messageType = ''
        state.messageText = ''
      } else {
        state.message = payload.message
        state.messageType = payload.messageType
        state.messageText = payload.messageText
      }
    }
  },
  actions: {
    async GET_USERS ({ state, commit }) {
      const response = await getData(endpoints.get)
      if (response.error) {
        commit('ERROR', errors.get)
        return
      }
      commit('UPDATE_USERS', response.data)
    }
  }
})
