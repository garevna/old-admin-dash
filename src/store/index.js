import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

const { getData, postData } = require('@/helpers').default

const errors = require('@/config/errors').default.rsp
const messages = require('@/config/messages').default.rsp
const endpoints = require('@/config/endpoints').default.rsp

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rsp: null,
    error: null,
    errorMessage: '',
    errorType: '',
    message: null,
    messageType: '',
    messageText: '',
    loading: null
  },
  modules,
  mutations: {
    UPDATE_RSP (state, payload) {
      state.rsp = payload
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
    async GET_RSP ({ state, commit }) {
      const response = await getData(endpoints.get)
      response.error ? commit('ERROR', errors.get) : commit('UPDATE_RSP', response.data)
    },
    async POST_RSP (context, payload) {
      const response = await postData(endpoints.post, payload)
      response.error ? context.commit('ERROR', errors.post) : context.commit('MESSAGE', messages.post)
    }
  }
})
