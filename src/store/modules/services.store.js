const { getData, postData, putData } = require('@/helpers').default

const state = {
  services: {},
  serviceSchema: require('@/config/servicesSchema').default
}

const mutations = {
  UPDATE_SERVICES: (state, payload) => {
    state.services = payload
  },
  ADD_SERVICE: (state, id, payload) => {
    state.services[id] = payload
  }
}

const actions = {
  async GET_SERVICES ({ state, commit }) {
    const response = await getData('service')

    console.log('SERVICES:\n', response)

    if (!response.error) {
      const services = {}
      for (const record of response.services) {
        const id = record._id
        const service = {}
        for (const key in state.serviceSchema) {
          service[key] = Object.assign({}, state.serviceSchema[key], {
            value: record[key]
          })
        }
        services[id] = service
      }

      console.log(services)

      commit('UPDATE_SERVICES', services)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Reading services',
        errorMessage: 'Process failed...'
      }, { root: true })
    }
    return response
  },

  async UPDATE_SERVICE ({ commit }, id, payload) {
    const body = Object.assign({}, ...Object.keys(payload).map(propName => ({ [propName]: payload[propName].value })))
    console.log(body)
    const response = await putData(`service/${id}`, body)

    console.log('SERVICE updated:\n', response)

    if (!response.error) {
      commit('MESSAGE', {
        message: true,
        messageType: 'Update service',
        messageText: 'Success'
      }, { root: true })
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Update service',
        errorMessage: 'Process failed...'
      }, { root: true })
    }
    return response
  },

  async ADD_NEW_SERVICE ({ state, commit }) {
    const service = Object.assign({}, ...Object.keys(state.serviceSchema).map(propName => ({ [propName]: state.serviceSchema[propName].value })))
    console.log(service)
    const response = await postData('service', service)

    console.log(response)

    if (!response.error) {
      commit('SERVICES', response.services)
      commit('MESSAGE', {
        message: true,
        messageType: 'Add new service',
        messageText: 'Success'
      }, { root: true })
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Saving service',
        errorMessage: 'Operation failed...'
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
