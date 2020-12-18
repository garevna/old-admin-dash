import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

const { getData, postData } = require('@/helpers').default

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rsp: null,
    resellers: null,
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
      const response = await getData('reseller')

      if (!response.error) {
        commit('UPDATE_RSP', response.resellers)
      } else {
        commit('ERROR', {
          error: true,
          errorType: 'GET RSP',
          errorMessage: response.error
        })
      }
    },
    async POST_RSP (context, payload) {
      const response = await postData('reseller', payload)

      if (!response.error) {
        context.commit('MESSAGE', {
          message: true,
          messageType: 'RSP preservation',
          messageText: 'All RSP saved'
        })
      } else {
        context.commit('ERROR', {
          error: true,
          errorType: 'RSP preservation error',
          errorMessage: response.error
        })
      }
    }
  }
})
