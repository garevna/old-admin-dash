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

      <CommonTikets v-if="goto === 'other'" />

      <ArchiveTikets v-if="goto === 'archive'" />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Tickets',
  props: [],

  components: {
    // Menu: () => import('@/components/Menu.vue'),
    LeadRequests: () => import('@/components/pages/tickets/LeadRequests.vue'),
    ConnectAddress: () => import('@/components/pages/tickets/ConnectAddress.vue'),
    CommonTikets: () => import('@/components/pages/tickets/CommonTickets.vue'),
    ArchiveTikets: () => import('@/components/pages/tickets/Archive.vue')
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
    goto: 'register'
  }),
  computed: {
    currentType () {
      return this.menuOptions.find(item => item.value === this.goto).text
    }
  }
}
</script>
