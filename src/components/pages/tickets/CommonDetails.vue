<template>
  <v-card flat max-height="480">
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
            <v-list-item @click="moveToArchive">
              <v-list-item-title>
                Move to archive
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="moveToTrash">
              <v-list-item-title>
                Move to trash (delete)
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-simple-table dark>
          <template v-slot:default>
            <tbody>
              <tr>
                <th> Company </th>
                <td> {{ currentTicket.rsp.company }} </td>
              </tr>
              <tr>
                <th> Email </th>
                <td> {{ currentTicket.rsp.email }} </td>
              </tr>
              <tr>
                <th> Phone </th>
                <td> {{ currentTicket.rsp.phone }} </td>
              </tr>
              <tr>
                <th> Contact Person Details </th>
                <td> {{ currentTicket.rsp.contactPersonDetails }} </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-divider color="#fff"></v-divider>
      <v-card-text>
        <h5 style="color: #fff">
          <v-icon class="mr-2" color="#fff">mdi-comment-question</v-icon>
          {{ currentTicket.subject }}
        </h5>
        <v-simple-table light class="homefone">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  <v-icon color="primary">mdi-message-arrow-right</v-icon>
                </td>
                <td>{{ currentTicket.description }}</td>
              </tr>
              <tr v-for="(item, index) in currentHistory" :key="index">
                <td>
                  <v-icon v-if="item.emitor !== 'admin'" color="primary">
                    mdi-message-arrow-right
                  </v-icon>
                  <v-icon v-else color="secondary">
                    mdi-message-arrow-left
                  </v-icon>
                </td>
                <td>{{ item.message }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
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
      sendMessageBack: 'SEND_MESSAGE',
      remove: 'REMOVE_TIKET'
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
      this.remove(this.id)
      this.$emit('update:id', null)
    },
    moveToTrash () {
      this.remove(this.id)
      this.$emit('update:id', null)
    }
  }
}
</script>

<style scoped>
h5 {
  font-size: 1rem;
  text-align: right;
}
</style>
