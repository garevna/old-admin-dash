<template>
  <v-card flat>
    <v-card dark v-if="id" class="pa-0">
      <v-toolbar dark>
        <v-toolbar-title>
          {{ currentTicket.createdAt }}
        </v-toolbar-title>
        <v-spacer />
        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              dark
              v-on="on"
            >
              <v-icon>$menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="changeStatus" v-if="type === 'connectivity-research'">
              <v-list-item-title>
                Change status to connection request
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeStatus" v-if="type === 'connection-request'">
              <v-list-item-title>
                Resolve request
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="moveToArchive">
              <v-list-item-title>
                Move to archive
              </v-list-item-title>
            </v-list-item>
            <!-- <v-list-item @click="moveToTrash">
              <v-list-item-title>
                Move to trash (delete)
              </v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-simple-table
        dark
        height="75%"
      >
        <template v-slot:default>
          <tbody>
            <tr>
              <td>RSP</td>
              <td>{{ currentRSP.company || currentRSP.name }}</td>
            </tr>
            <tr class="my-2">
              <td>Address</td>
              <td><b color="#09b">{{ currentTicket.address }}</b></td>
            </tr>
            <!-- <tr>
              <td>Apt.num</td>
              <td>{{ currentTicket.apartmentNumber }}</td>
            </tr> -->
            <tr v-if="currentTicket.footprint">
              <td>Footprint</td>
              <td><v-checkbox :input-value="currentTicket.footprint" readonly color="#E82F37" /></td>
            </tr>
            <tr v-if="!currentTicket.footprint">
              <td>Distance from the footprint</td>
              <td>{{ Math.round(currentTicket.distanceFromFootprint) }}</td>
            </tr>
            <tr v-if="currentTicket.message">
              <td>Message from RSP</td>
              <td>{{ currentTicket.message }}</td>
            </tr>
            <tr
              v-for="(item, index) in currentTicket.history"
              :key="index"
            >
              <td>{{ item.emitor }}</td>
              <td>{{ item.message }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card flat v-if="currentTicket" class="mt-6">
      <v-toolbar flat>
        <v-toolbar-title>
          <p>Send message back</p>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          v-if="messageBack.length > 0"
          icon
          @click="sendMessage"
        >
          <v-icon>$send</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-textarea v-model="messageBack" />
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TicketDetails',
  props: ['id', 'type'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapState('address-requests', ['tickets']),
    ...mapState(['rsp']),
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },

    currentRSP () {
      const id = this.currentTicket.resellerId
      return this.rsp.find(item => item._id === id) || {}
    }
  },

  methods: {
    ...mapMutations('address-requests', {
      updateTickets: 'TICKETS'
    }),
    ...mapActions('address-requests', {
      sendMessageBack: 'SEND_MESSAGE_WITH_CURRENT_TICKET'
    }),
    sendMessage () {
      this.currentTicket.history.push({
        createdAt: Date.now(),
        emitor: 'admin',
        message: this.messageBack
      })
      this.sendMessageBack({
        id: this.id,
        historyElement: {
          createdAt: Date.now(),
          emitor: 'admin',
          message: this.messageBack
        }
      })
    },
    moveToArchive () {
      //
    },
    // moveToTrash () {
    //   const index = this.tickets.findIndex(item => item._id === this.currentTicket._id)
    //   this.tickets.splice(index, 1)
    //   index !== -1 && this.updateTickets()
    // },
    changeStatus () {
      //
    }
  }
}
</script>
