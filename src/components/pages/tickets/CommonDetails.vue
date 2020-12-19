<template>
  <v-card flat>
    <v-card dark v-if="id" class="pa-0">
      <v-toolbar dark>
        <v-toolbar-title>
          {{ currentTicket.createdAt }}
        </v-toolbar-title>
      </v-toolbar>

      <v-simple-table dark height="75%">
        <template v-slot:default>
          <tbody>
            <tr class="my-2">
              <td>Subject</td>
              <td>
                <b color="#09b">{{ currentTicket.subject }}</b>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{{ currentTicket.description }}</td>
            </tr>
            <tr v-for="(item, index) in currentHistory" :key="index">
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
        <v-btn v-if="validate" icon @click="sendMessage">
          <v-icon>$send</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-textarea no-resize rows="8" v-model="messageBack" placeholder="Message"/>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommonDetails',
  props: ['id'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    validate () {
      return this.messageBack.length
    },
    ...mapState('common', ['tickets']),
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },
    currentHistory () {
      return this.currentTicket.history.slice().reverse()
    }
  },
  watch: {
    id (val) {
      this.clear()
    }
  },
  methods: {
    clear () {
      this.messageBack = ''
    },
    ...mapActions('common', {
      sendMessageBack: 'SEND_MESSAGE'
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
      this.clear()
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
