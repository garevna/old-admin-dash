export default {
  registration: {
    get: 'ticket/registration',
    post: 'ticket/registration',
    put: 'ticket/registration',
    patch: '',
    delete: 'ticket/registration',
    accept: 'ticket/registration/accept',
    reject: 'ticket/registration/reject'
  },
  rsp: {
    get: 'reseller',
    post: 'reseller',
    put: 'reseller',
    patch: 'reseller',
    delete: 'reseller'
  },
  connection: {
    get: 'ticket/connection-request',
    post: 'ticket/connection-request',
    put: 'ticket/connection-request',
    patch: 'ticket/connection-request',
    delete: 'ticket/connection-request',
    history: 'ticket/connection-request/set-history'
  },
  connectivity: {
    get: 'ticket/connectivity-research',
    post: 'ticket/connection-request',
    put: 'ticket/connection-request',
    patch: 'ticket/connection-request',
    delete: 'ticket/connection-request',
    history: 'ticket/connection-request/set-history'
  },
  common: {
    get: 'ticket/common',
    post: 'ticket/common',
    put: 'ticket/common',
    patch: '',
    delete: 'ticket/common',
    history: 'ticket/common/set-history'
  },
  services: {
    get: 'service',
    post: 'service',
    put: 'service',
    patch: '',
    delete: 'service'
  }
}
