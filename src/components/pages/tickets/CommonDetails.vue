<template>
  <v-row v-if="opened">
    <v-col cols="12" lg="6">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <Profile :user="currentUser" />
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col cols="12" lg="6">
      <!-- <h5>{{ currentTicket.description }}</h5> -->
      <Chat :message.sync="messageBack" :ticket="currentTicket" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CommonDetails',
  components: {
    Profile: () => import('@/components/pages/tickets/Profile.vue'),
    Chat: () => import('@/components/pages/tickets/Chat.vue')
  },
  props: ['id', 'opened', 'message'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapState('common', ['tickets']),
    ...mapGetters(['getUserById']),
    validate () {
      return this.messageBack.length
    },
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },
    currentUser () {
      return this.getUserById(this.currentTicket.resellerId)
    },
    currentHistory () {
      return this.currentTicket.history
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
    color (emiter) {
      return emiter === 'admin' ? '#333' : this.$vuetify.theme.themes.light.warning
    },
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
