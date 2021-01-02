export default {
  registration: {
    reject: {
      message: true,
      messageType: 'Reject Leads request',
      messageText: 'Success. Leads request was rejected'
    },
    accept: {
      message: true,
      messageType: 'Accept Leads request',
      messageText: 'Success. Leads request has been accepted'
    }
  },
  rsp: {
    post: {
      message: true,
      messageType: 'RSP list data saving',
      messageText: 'All RSP have been saved'
    }
  },
  address: {
    delete: {
      message: true,
      messageType: 'Delete ticket',
      messageText: 'Ticket has been removed forever'
    },
    reject: {
      message: true,
      messageType: 'Reject connection request',
      messageText: 'Success. Connection request was rejected'
    },
    accept: {
      message: true,
      messageType: 'Accept connection request',
      messageText: 'Success. Connection request has been accepted'
    },
    history: {
      message: true,
      messageType: 'Send message back',
      messageText: 'Success. Message has been delivered'
    },
    status: {
      message: true,
      messageType: 'Success',
      messageText: 'Connection request status has been changed'
    },
    type: {
      message: true,
      messageType: 'Success',
      messageText: 'Connection request type has been changed'
    }
  },
  common: {
    delete: {
      message: true,
      messageType: 'Delete ticket',
      messageText: 'Ticket has been removed forever'
    },
    history: {
      message: true,
      messageType: 'Send message back',
      messageText: 'Success. Message has been delivered'
    }
  },
  services: {
    create: {
      message: true,
      messageType: 'Creating new service',
      messageText: 'Operation has succeeded. New service has been created'
    },
    update: {
      message: true,
      messageType: 'Update service',
      messageText: 'Success. Service has been updated'
    },
    upload: {
      message: true,
      messageType: 'Upload service SLA',
      messageText: 'Success. File has been uploded'
    },
    delete: {
      message: true,
      messageType: 'Removing service',
      messageText: 'Service has been removed forever'
    }
  }
}
