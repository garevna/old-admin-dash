<template>
  <v-row v-if="opened">
    <v-col cols="12" lg="6">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td width="160">RSP</td>
              <td><b>{{ currentRSP.company || currentRSP.name }}</b></td>
            </tr>
            <tr class="my-2">
              <td>Contact person</td>
              <td>
                <b>{{ currentRSP.contactPersonDetails }}</b>
              </td>
            </tr>
            <tr>
              <td rowspan="2">Tariff</td>
              <td style="padding: 0">
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <b> {{ currentTariff.tariffName || '?' }} </b>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-simple-table dense>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td class="tariff">Downstream Speed</td>
                              <td class="tariff"> {{ currentTariff.downstreamSpeed || '' }} </td>
                            </tr>
                            <tr>
                              <td class="tariff">Upstream Speed</td>
                              <td class="tariff"> {{ currentTariff.upstreamSpeed || '' }} </td>
                            </tr>
                            <tr>
                              <td class="tariff">Data Limit</td>
                              <td class="tariff"> {{ currentTariff.dataLimit || '' }} </td>
                            </tr>
                            <tr>
                              <td class="tariff">Price</td>
                              <td class="tariff"> {{ currentTariff.price || '' }} </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col cols="12" lg="6">
      <v-simple-table>
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
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TicketDetails',
  props: ['id', 'type', 'opened'],

  data: () => ({
    messageBack: ''
  }),

  computed: {
    ...mapState('address-requests', ['tickets']),
    ...mapState(['rsp', 'tariffs']),
    currentTicket () {
      return this.tickets.find(item => item._id === this.id)
    },

    currentTariff () {
      const tariff = this.tariffs.find(item => item._id === this.currentTicket.tariffId)
      return tariff || {}
    },

    currentRSP () {
      const rsp = this.rsp.find(item => item._id === this.currentTicket.resellerId)
      return rsp
    }
  },

  // watch: {
  //   currentTicket: {
  //     deep: true,
  //     handler (val) {
  //       this.$store.dispatch('GET_ALL_TICKETS_OF_RSP', val.resellerId)
  //         .then(response => console.log('ALL RSP TICKETS:\n', response))
  //     }
  //   }
  // },

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
.tariff {
  font-size: 12px!important;
}
</style>
<style>
.v-application--is-ltr .v-text-field .v-label {
  font-size: 12px;
}
</style>
