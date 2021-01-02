<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card flat class="transparent pa-4 mt-4 mb-12">
          <v-card-actions>
            <v-spacer />
            <v-btn icon @click="getTickets">
              <v-icon color="#444"> mdi-reload </v-icon>
            </v-btn>
          </v-card-actions>
          <v-data-table
            fixed-header
            :headers="headers"
            :items="requests"
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
                <TicketDetails
                  opened="expanded[0] && expanded[0]._id === item._id"
                  :id.sync="item._id"
                  :type="type"
                />
              </td>
            </template>
            <template v-slot:item.notAnswered="{ item }">
              <v-icon color="#900">
                {{ item.notAnswered ? 'mdi-comment-question' : '' }}
              </v-icon>
            </template>
            <template v-slot:item.footprint="{ item }">
              <v-simple-checkbox
                v-model="item.footprint"
                disabled
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      class="mr-2"
                      @click="accept(item)"
                      color="#777"
                    >
                      $accept
                    </v-icon>
                  </v-btn>
                </template>
                <span>Accept connection request</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      @click="reject(item)"
                      color="#777"
                    >
                      $reject
                    </v-icon>
                  </v-btn>
                </template>
                <span>Reject connection request</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ConnectAddress',

  components: {
    TicketDetails: () => import('@/components/pages/tickets/TicketDetails.vue')
  },

  props: ['type'],

  data: () => ({
    messageBack: '',
    expanded: []
  }),
  computed: {
    ...mapState('address-requests', ['tickets']),
    ...mapState(['rsp']),
    requests () {
      return this.tickets.map(ticket => Object.assign({}, ticket, {
        notAnswered: !ticket.history.length || ticket.history[ticket.history.length - 1].emitor !== 'admin'
      }))
    },
    headers () {
      return [
        {
          text: 'Waiting',
          value: 'notAnswered'
        },
        { text: 'Data', value: 'createdAt' },
        { text: 'Address', value: 'address' },
        {
          text: this.type === 'connectivity' ? 'Distance from footprint (m)' : 'Footprint',
          value: this.type === 'connectivity' ? 'distanceFromFootprint' : 'footprint'
        },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' }
      ]
    },
    currentTicket () {
      return this.tickets.find(item => item._id === this.currentTicketId)
    },
    currentRSP () {
      return this.rsp.find(item => item._id === this.currentTicket.resellerId) || {}
    }
  },

  watch: {
    type: {
      immediate: true,
      handler (val) {
        this.currentTicketId = null
        this.updateTicketType(val)
        this.getTickets()
      }
    }
  },

  methods: {
    ...mapMutations('address-requests', {
      updateTicketType: 'UPDATE_TICKET_TYPE'
    }),
    ...mapActions('address-requests', {
      getTickets: 'GET_TICKETS',
      sendMessage: 'SEND_MESSAGE_WITH_CURRENT_TICKET',
      updateStatus: 'UPDATE_STATUS',
      updateType: 'UPDATE_TYPE'
    }),
    accept (item) {
      this.updateStatus({
        id: item._id,
        status: 'accept',
        resellerId: item.resellerId
      })
    },
    reject (item) {
      this.updateStatus({
        id: item._id,
        status: 'archive',
        resellerId: item.resellerId
      })
    }
  }
}
</script>
