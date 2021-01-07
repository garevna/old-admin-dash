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
  users: {
    get: 'user'
  },
  rsp: {
    get: 'reseller',
    post: 'reseller',
    put: 'reseller',
    patch: 'reseller',
    delete: 'reseller'
  },
  clients: {
    read: 'user/corporate-clients'
  },
  tariff: {
    get: 'tariff',
    post: 'tariff',
    put: 'tariff',
    delete: 'tariff'
  },
  connection: {
    get: 'ticket/connection-request',
    post: 'ticket/connection-request',
    put: 'ticket/connection-request',
    patch: 'ticket/connection-request',
    delete: 'ticket/connection-request',
    history: 'ticket/connection-request/set-history',
    type: 'ticket/connection-request/set-type',
    status: 'ticket/connection-request/set-status'
  },
  connectivity: {
    get: 'ticket/connectivity-research',
    post: 'ticket/connection-request',
    put: 'ticket/connection-request',
    patch: 'ticket/connection-request',
    delete: 'ticket/connection-request',
    history: 'ticket/connection-request/set-history',
    type: 'ticket/connection-request/set-type',
    status: 'ticket/connection-request/set-status'
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
