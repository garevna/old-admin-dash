<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card flat class="transparent">
          <v-simple-table fixed-header max-height="75%">
            <template v-slot:default>
              <thead>
                <tr>
                  <th style="width: 160px"> Date (created) </th>
                  <th style="width: 340px"> Address </th>
                  <th v-if="type === 'connection-request'">
                    Footprint
                  </th>
                  <th v-if="type === 'connectivity-research'">
                    Distance from footprint
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in tickets"
                  :key="index"
                  @click="rowClickHandler(item._id)"
                >
                  <td>{{ item.createdAt }}</td>
                  <!-- <td>{{ item.apartmentNumber }}</td> -->
                  <td>{{ item.address }}</td>
                  <td v-if="item.footprint">
                    <v-checkbox
                      :input-value="item.footprint"
                      readonly
                      color="#E82F37"
                    ></v-checkbox>
                  </td>
                  <td v-if="!item.footprint" class="text-center">
                    {{ `${Math.round(item.distanceFromFootprint) || ''} m` }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <TicketDetails
          :id.sync="currentTicketId"
          :type="type"
        />
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
    currentTicketId: null,
    messageBack: ''
  }),
  computed: {
    ...mapState('address-requests', ['tickets']),
    ...mapState(['rsp']),
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
        this.getTikets()
      }
    }
  },

  methods: {
    ...mapMutations('address-requests', {
      updateTicketType: 'UPDATE_TICKET_TYPE'
    }),
    ...mapActions('address-requests', {
      getTikets: 'GET_TICKETS',
      sendMessage: 'SEND_MESSAGE_WITH_CURRENT_TICKET'
    }),
    rowClickHandler (id) {
      this.currentTicketId = id
    }
  }
}
</script>
