<template>
  <v-row v-if="opened">
    <v-col cols="12" lg="6">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <v-expansion-panels class="transparent">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b> {{ currentTicket.company || 'Unknown' }} </b>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <th> Email </th>
                            <td> {{ currentRSP.email }} </td>
                          </tr>
                          <tr>
                            <th> Phone </th>
                            <td> {{ currentRSP.phone }} </td>
                          </tr>
                          <tr>
                            <th> Address </th>
                            <td> {{ currentRSP.address }} </td>
                          </tr>
                          <tr>
                            <th> Contact Person</th>
                            <td> {{ currentRSP.contactPersonDetails }} </td>
                          </tr>
                          <tr>
                            <th> Contact Phone</th>
                            <td> {{ currentRSP.contactPhone }} </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col cols="12" lg="6">
      <v-card-text>
        <v-icon color="#900">$messageFrom</v-icon>
        {{ currentTicket.description }}
      </v-card-text>
      <v-expansion-panels v-if="currentTicket.history.length">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon color="#444">mdi-account-voice</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(item, index) in currentTicket.history"
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-text>
        <v-text-field
          v-model="messageBack"
          label="Send message"
          append-outer-icon="$send"
          @click:append-outer="sendMessage"
        />
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommonDetails',
  props: ['id', 'opened', 'message'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapState(['rsp']),
    ...mapState('common', ['tickets']),
    validate () {
      return this.messageBack.length
    },
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },
    currentRSP () {
      console.log(this.rsp.find(item => item._id === this.currentTicket.resellerId) || {})
      return this.rsp.find(item => item._id === this.currentTicket.resellerId) || {}
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
    ...mapActions('common', {
      sendMessageBack: 'SEND_MESSAGE',
      remove: 'REMOVE_TIKET'
    }),
    clear () {
      this.messageBack = ''
    },
    color (emiter) {
      return emiter === 'admin' ? '#333' : this.$vuetify.theme.themes.light.primary
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
