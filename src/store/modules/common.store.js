const { getData, patchData } = require('@/helpers').default

const state = {
  tickets: [],
  ticketsError: null,
  ticketsLoading: false
}

const mutations = {
  TICKETS: (state, payload) => {
    state.tickets = payload
  }
}

const actions = {
  async GET_TICKETS ({ getters, commit, dispatch }) {
    const response = await getData('ticket/common')

    console.log('common:\n', response)

    if (!response.error) {
      const tickets = response.data
        .map(item => Object.assign({}, item, {
          createdAt: item.createdAt ? (new Date(item.createdAt - 0)).toISOString().slice(0, 10) : ''
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
