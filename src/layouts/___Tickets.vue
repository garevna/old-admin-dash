<template>
  <v-container>
    <!-- <v-app-bar app elevate-on-scroll> -->
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          Tickets
        </v-toolbar-title>
        <v-spacer />
        <!-- <TicketsBtnGroup
          :accept.sync="acceptBtn"
          :reject.sync="rejectBtn"
          :send.sync="sendBtn"
        /> -->
        <Menu :options="menuOptions" :goto.sync="goto" />
      </v-toolbar>
    <!-- </v-app-bar> -->

    <v-card>
      <Registration v-if="goto === 'register'" :params="params" />
      <Common
        v-if="goto === 'other'"
        :params="params"
        :accept.sync="acceptBtn"
        :reject.sync="rejectBtn"
        :send.sync="sendBtn"
      />
      <ConnectionRequest v-if="goto === 'address'" :params="params" />
      <ConnectivityResearch
        v-if="goto === 'other'"
        :params="params"
      />
    </v-card>
  </v-container>
</template>

<script>
// import Button from '@/components/Button'

export default {
  name: 'TicketsLayout',
  props: [],

  components: {
    // Button,
    Menu: () => import('@/components/menu/Menu'),
    // TicketsBtnGroup: ('@/layouts/tickets/TicketsBtnGroup') => import(),
    Common: () => import('@/views/Common'),
    Registration: () => import('@/views/Registration'),
    ConnectionRequest: () => import('@/views/ConnectionRequest'),
    ConnectivityResearch: () => import('@/views/ConnectivityResearch')
  },

  data: () => ({
    // menuOptions: require('@/components/menu/menu-options-for-tickets-layout.json'),
    menuOptions: [
      {
        text: 'Registration request',
        value: 'register'
      },
      {
        text: 'Connection request',
        value: 'address'
      },
      {
        text: 'Other',
        value: 'other'
      },
      {
        text: '',
        value: ''
      }
    ],
    goto: 'register',
    name: '',
    params: null,
    acceptBtn: false,
    rejectBtn: false,
    sendBtn: false
  }),

  methods: {
    to (obj) {
      this.$ticketLayoutRouter.to(obj)
    },
    show (name) {
      return this.name === name
    },
    callBack ({ name, params }) {
      this.name = name
      this.params = params
    }
  },
  created () {
    this.$ticketLayoutRouter.addListener(this.callBack)
    this.to({ name: 'Registration' })
    this.params = this.$ticketLayoutRouter.getParams()
    this.name = this.$ticketLayoutRouter.getRouteName()
  },
  destroyed () {
    this.$ticketLayoutRouter.removeListener(this.callBack)
  }
}
</script>
