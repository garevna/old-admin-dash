<template>
  <v-container>
    <v-app-bar app flat>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          {{ currentType }}
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip
          bottom
          color="primary"
          v-for="(item, index) in menuOptions"
          :key="index"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              :color="goto !== item.value ? '#333' : 'primary'"
              dark
              v-on="on"
              @click="goto = item.value"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
        <!-- <Menu :options="menuOptions" :goto.sync="goto" /> -->
      </v-toolbar>
    </v-app-bar>

    <v-card flat class="transparent">
      <LeadRequests v-if="goto === 'register'" />

      <ConnectAddress
        v-if="goto === 'connection-request' || goto === 'connectivity-research'"
        :type="goto"
      />

      <Common
        v-if="goto === 'other'"
        :params="params"
        :accept.sync="acceptBtn"
        :reject.sync="rejectBtn"
        :send.sync="sendBtn"
      />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Tickets',
  props: [],

  components: {
    // Menu: () => import('@/components/Menu.vue'),
    Common: () => import('@/components/pages/tickets/Common.vue'),
    LeadRequests: () => import('@/components/pages/tickets/LeadRequests.vue'),
    ConnectAddress: () => import('@/components/pages/tickets/ConnectAddress.vue')
  },

  data: () => ({
    menuOptions: [
      {
        text: 'Leads requests',
        value: 'register',
        icon: '$registration'
      },
      {
        text: 'Connection request',
        value: 'connection-request',
        icon: '$connection'
      },
      {
        text: 'Connectivity research',
        value: 'connectivity-research',
        icon: '$connectivity'
      },
      {
        text: 'Other requests',
        value: 'other',
        icon: '$common'
      },
      {
        text: 'Archive',
        value: 'archive',
        icon: '$archive'
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
