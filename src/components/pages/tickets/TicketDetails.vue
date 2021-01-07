<template>
  <v-row v-if="opened">
    <v-col cols="12" lg="6" class="profile">
      <Profile :user="currentUser" />
      <Tariff :currentTariff="currentTariff" />
    </v-col>
    <v-col cols="12" lg="6" class="chat">
      <Chat :ticket="currentTicket" :message.sync="messageBack" />
      <!-- <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr v-if="currentTicket.message">
              <td>
                <v-icon color="primary">$messageFrom</v-icon>
              </td>
              <td class="text--black">{{ currentTicket.message }}</td>
            </tr>
            <tr
              v-for="(item, index) in currentTicket.history"
              :key="index"
            >
              <td>
                <v-icon :color="color(item.emitor)">
                  {{ item.emitor !== 'admin'? '$messageFrom' : '$messageTo' }}
                </v-icon>
              </td>
              <td>{{ item.message }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        <v-text-field
          v-model="messageBack"
          label="Send message back"
          append-outer-icon="$send"
          @click:append-outer="sendMessage"
        />
      </v-card-text> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TicketDetails',
  components: {
    Profile: () => import('@/components/pages/tickets/Profile.vue'),
    Chat: () => import('@/components/pages/tickets/Chat.vue'),
    Tariff: () => import('@/components/pages/tickets/Tariff.vue')
  },
  props: ['id', 'type', 'opened'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapState('address-requests', ['tickets']),
    ...mapGetters(['getUserById']),
    ...mapState('tariff', ['tariffs']),
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },

    currentTariff () {
      const tariff = this.tariffs.find(item => item._id === this.currentTicket.tariffId)
      return tariff || {}
    },

    currentUser () {
      return this.getUserById(this.currentTicket.resellerId)
    }
  },

  watch: {
    messageBack (val) {
      console.log(val)
    }
  },

  methods: {
    ...mapMutations('address-requests', {
      updateTickets: 'TICKETS'
    }),
    ...mapActions('address-requests', {
      sendMessageBack: 'SEND_MESSAGE_WITH_CURRENT_TICKET'
    }),
    color (emiter) {
      return emiter === 'admin' ? '#333' : this.$vuetify.theme.themes.light.primary
    },
    sendMessage () {
      this.sendMessageBack({
        id: this.id,
        historyElement: {
          createdAt: Date.now(),
          emitor: 'admin',
          message: this.messageBack
        }
      }).then((response) => {
        if (response) {
          this.currentTicket.history.push({
            createdAt: Date.now(),
            emitor: 'admin',
            message: this.messageBack
          })
        }
        this.messageBack = ''
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

<style scoped>
.profile {
  background: #eaeaea;
}
.chat {
  border: solid 1px #999;
  border-radius: 4px;
  padding: 16px;
}
.tariff {
  font-size: 12px!important;
}
</style>
<style>
.v-application--is-ltr .v-text-field .v-label {
  font-size: 12px;
}
</style>
