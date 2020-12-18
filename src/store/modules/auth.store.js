const { getData } = require('@/helpers').default

const state = {
  user: null
}

const mutations = {
  USER: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  async GET_USER ({ commit, dispatch }, hash) {
    if (!hash) {
      commit('ERROR', {
        error: true,
        errorType: 'Auth',
        errorMessage: 'You have no access'
      }, { root: true })
      return
    }
    const response = await getData(`user/find_by_hash/${hash}`)

    if (!response.error) {
      commit('MESSAGE', {
        message: true,
        messageType: 'Authorization',
        messageText: 'Access granted'
      }, { root: true })
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Authorization',
        errorMessage: 'Auth failed'
      }, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
