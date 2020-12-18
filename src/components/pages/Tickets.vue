<template>
  <v-container>
    <v-app-bar app flat>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          {{ currentType }}
        </v-toolbar-title>
        <v-spacer />
        <Menu :options="menuOptions" :goto.sync="goto" />
      </v-toolbar>
    </v-app-bar>

    <v-card flat class="transparent">
      <LeadRequests v-if="goto === 'register'" />
      <Common
        v-if="goto === 'other'"
        :params="params"
        :accept.sync="acceptBtn"
        :reject.sync="rejectBtn"
        :send.sync="sendBtn"
      />
      <ConnectAddress
        v-if="goto === 'connection-request' || goto === 'connectivity-research'"
        :type="goto"
      />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'TicketsLayout',
  props: [],

  components: {
    Menu: () => import('@/components/Menu.vue'),
    Common: () => import('@/components/pages/tickets/Common.vue'),
    LeadRequests: () => import('@/components/pages/tickets/LeadRequests.vue'),
    ConnectAddress: () => import('@/components/pages/tickets/ConnectAddress.vue')
  },

  data: () => ({
    menuOptions: [
      {
        text: 'Leads requests',
        value: 'register'
      },
      {
        text: 'Connection request',
        value: 'connection-request'
      },
      {
        text: 'Connectivity research',
        value: 'connectivity-research'
      },
      {
        text: 'Other requests',
        value: 'other'
      }
    ],
    goto: 'register',
    name: '',
    params: null,
    acceptBtn: false,
    rejectBtn: false,
    sendBtn: false
  }),
  computed: {
    currentType () {
      return this.menuOptions.find(item => item.value === this.goto).text
    }
  }
}
</script>
