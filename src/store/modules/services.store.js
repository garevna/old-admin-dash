const { getData, postData, putData, deleteData } = require('@/helpers').default

const state = {
  services: {},
  serviceSchema: require('@/config/servicesSchema').default
}

const mutations = {
  UPDATE_SERVICES: (state, payload) => {
    state.services = payload
  },
  UPDATE_SERVICE_BY_ID: (state, payload) => {
    state.services = Object.assign({}, state.services, {
      [payload.id]: payload.value
    })
  },
  REMOVE_SERVICE: (state, id) => {
    const ids = Object.keys(state.services).filter(item => item !== id)
    state.services = Object.assign({}, ...ids.map(item => ({ [item]: state.services[item] })))
  }
}

const actions = {
  async GET_SERVICES ({ state, commit }) {
    const response = await getData('service')
    const services = {}
    if (!response.error) {
      for (const record of response.data) {
        const id = record._id
        const service = {}
        for (const key in state.serviceSchema) {
          service[key] = Object.assign({}, state.serviceSchema[key], {
            value: record[key]
          })
        }
        Object.assign(services, { [id]: service })
      }

      commit('UPDATE_SERVICES', services)
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Reading services',
        errorMessage: 'Process failed...'
      }, { root: true })
    }
    return services
  },

  async UPDATE_SERVICE ({ state, commit }, id) {
    const data = state.services[id]
    const body = Object.assign({}, ...Object.keys(data).map(propName => ({ [propName]: data[propName].value })))
    const response = await putData(`service/${id}`, body)

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

  async CREATE_SERVICE ({ state, commit }) {
    const service = Object.assign({}, ...Object.keys(state.serviceSchema).map(propName => ({ [propName]: state.serviceSchema[propName].value })))

    const response = await postData('service', service)

    if (!response.error) {
      commit('UPDATE_SERVICE_BY_ID', { id: response.data, value: Object.assign({}, state.serviceSchema) })
      commit('MESSAGE', {
        message: true,
        messageType: 'Creating new service',
        messageText: 'Operation has succeeded'
      }, { root: true })
      return {
        id: response.data,
        service
      }
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Creating new service',
        errorMessage: 'Operation failed...'
      }, { root: true })
      return null
    }
  },

  async DELETE_SERVICE ({ state, commit }, id) {
    const response = await deleteData(`service/${id}`)

    console.log(response)

    if (!response.error) {
      commit('REMOVE_SERVICE', id)
      commit('MESSAGE', {
        message: true,
        messageType: 'Removing service',
        messageText: 'Service has been removed forever'
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
