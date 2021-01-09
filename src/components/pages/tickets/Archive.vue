<template>
  <v-container class="homefone">
    <v-card flat class="transparent pa-4 mt-4 mb-12">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="tickets"
        item-key="_id"
        :sort-by="['createdAt', 'address']"
        :sort-desc="[false, true]"
        multi-sort
        :expanded.sync="expanded"
        single-expand
        show-expand
        class="transparent elevation-0"
        height="70vh"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <table class="mx-auto">
              <tbody>
                <tr>
                  <td>
                    <h4 style="margin-right: 48px">{{ labels[mode] }}</h4>
                  </td>
                  <td>
                    <Profile :user="currentUser" v-if="mode === 'profile'" />
                    <Tariff :currentTariff="currentTariff" v-if="mode === 'tariff'" />
                    <Chat :ticket="item" v-if="mode === 'chat'" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </template>
        <template v-slot:item.footprint="{ item }">
          <v-simple-checkbox
            v-model="item.footprint"
            disabled
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.sections="{ item }">
          <!-- <v-tooltip bottom color="info" v-if="expanded[0] && expanded[0]._id === item._id">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
                @click="mode = 'profile'"
              >
                <v-icon :class="getClass('profile')"> $profile </v-icon>
              </v-btn>
            </template>
            <span>Company profile</span>
          </v-tooltip> -->
          <v-tooltip bottom color="info" v-if="expanded[0] && expanded[0]._id === item._id">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
                @click="mode = 'tariff'"
              >
                <v-icon :class="getClass('tariff')"> $tariff </v-icon>
              </v-btn>
            </template>
            <span>Tariff</span>
          </v-tooltip>
          <v-tooltip bottom color="info" v-if="expanded[0] && expanded[0]._id === item._id">
            <template v-slot:activator="{ on }" :class="getClass('chat')">
              <v-btn
                icon
                v-on="on"
                @click="mode = 'chat'"
              >
                <v-icon :class="getClass('chat')"> mdi-forum </v-icon>
              </v-btn>
            </template>
            <span>Messaging</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="empty" :timeout="2500" centered>
      <h4 class="snackbar-title">Empty result</h4>There are no archived tickets of this RSP
    </v-snackbar>
  </v-container>
</template>

<style scoped>
  .snackbar-title {
    color: #fff !important;
  }
  tr.v-data-table__expanded.v-data-table__expanded__row .v-icon.v-icon.active-icon {
    color: #fff !important;
  }
  tr.v-data-table__expanded.v-data-table__expanded__row .v-icon.v-icon.passive-icon {
    color: #ccc !important;
  }
</style>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Archive',

  components: {
    Profile: () => import('@/components/pages/tickets/ProfileSimple.vue'),
    Chat: () => import('@/components/pages/tickets/ChatSimple.vue'),
    Tariff: () => import('@/components/pages/tickets/TariffSimple.vue')
  },

  props: ['resellerId', 'reload'],

  data: () => ({
    expanded: [],
    labels: {
      profile: 'Company Profile',
      tariff: 'Tariff',
      chat: 'Messaging'
    },
    mode: 'chat',
    empty: false
  }),
  computed: {
    ...mapState('address-requests', { tickets: 'archived' }),
    ...mapState(['users']),
    ...mapGetters(['getUserById']),
    ...mapState('tariff', ['tariffs']),
    label () {
      return this.labels[this.mode] || 'Info'
    },
    currentUser () {
      return this.expanded[0] ? this.getUserById(this.expanded[0].resellerId) : {}
    },
    currentTariff () {
      return this.expanded[0] ? this.tariffs.find(item => item._id === this.expanded[0].tariffId) : {}
    },
    headers () {
      return [
        { text: 'Data', value: 'createdAt' },
        { text: 'Address', value: 'address' },
        { text: 'Footprint', value: 'footprint' },
        { text: 'Distance from footprint (m)', value: 'distanceFromFootprint' },
        { text: '', value: 'sections', sortable: false },
        // { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },

  watch: {
    tickets: {
      deep: true,
      handler (val) {
        this.empty = !val.length
      }
    }
  },

  methods: {
    getClass (mode) {
      return this.mode === mode ? 'active-icon' : 'passive-icon'
    }
  }
}
</script>
