<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-icon>mdi-forum</v-icon>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-if="ticket.message || ticket.description">
                <td width="120">
                  <v-icon color="primary">$chat</v-icon>
                </td>
                <td class="text--black">{{ ticket.message || ticket.description }}</td>
              </tr>
              <tr
                v-for="(item, index) in ticket.history"
                :key="index"
              >
                <td>
                  <v-icon :color="color(item.emitor)">
                    {{ item.emitor !== 'admin'? '$messageFrom' : '$messageTo' }}
                  </v-icon>&nbsp;
                  <small>{{ _getDate(item.createdAt) }}</small>
                </td>
                <td>{{ item.message }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-text>
          <v-text-field
            v-if="ticket.status !== 'archive'"
            v-model="messageBack"
            label="Send message"
            append-outer-icon="$send"
            @click:append-outer="sendMessage"
          />
        </v-card-text>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  props: ['ticket', 'message'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapGetters(['getUserById']),

    currentUser () {
      return this.getUserById(this.currentTicket.resellerId)
    }
  },

  methods: {
    ...mapActions('address-requests', {
      sendMessageBack: 'SEND_MESSAGE_WITH_CURRENT_TICKET'
    }),
    color (emiter) {
      return emiter === 'admin' ? '#333' : this.$vuetify.theme.themes.light.info
    },
    sendMessage () {
      const historyElement = {
        createdAt: Date.now(),
        emitor: 'admin',
        message: this.messageBack
      }
      this.sendMessageBack({
        id: this.ticket._id,
        historyElement
      }).then((response) => {
        if (response) this.ticket.history.push(historyElement)
        this.messageBack = ''
      })
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
