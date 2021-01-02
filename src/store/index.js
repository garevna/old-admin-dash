import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

const { getData, postData } = require('@/helpers').default

const errors = require('@/config/errors').default.rsp
const messages = require('@/config/messages').default.rsp
const endpoints = require('@/config/endpoints').default.rsp
const tariff = require('@/config/endpoints').default.tariffs

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rsp: null,
    tariffs: null,
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
    UPDATE_TARIFFS (state, payload) {
      state.tariffs = payload
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
    },
    async GET_TARIFFS (context, id) {
      const response = (await getData(tariff.get)).data
      context.commit('UPDATE_TARIFFS', response)
      return response
    },
    async GET_ALL_TICKETS_OF_RSP (context, id) {
      const response1 = (await getData(`ticket/connection-request/by-rsp/${id}`)).data
      const response2 = (await getData(`ticket/connectivity-research/by-rsp/${id}`)).data
      const response3 = response1.concat(response2)
      return response3
    }
  }
})
