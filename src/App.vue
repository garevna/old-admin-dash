<template>
  <v-app>
    <v-main v-if="ready" class="homefone">
      <Tickets v-if="!navigate || navigate === 'tickets'" />
      <!-- <EndCustomer v-if="navigate === 'customers'" /> -->
      <!-- <v-container>
        <v-row justify="center" class="mt-8">
          <v-col cols="12" md="6" lg="5" xl="4" style="border: solid 1px #777">
            <v-card flat height="75vh" class="transparent"></v-card>
          </v-col>
          <v-col cols="12" md="6" lg="5" xl="4" style="border: solid 1px #777">
            <v-card flat height="75vh" class="transparent"></v-card>
          </v-col>
        </v-row>
      </v-container> -->
      <RSP v-if="navigate === 'resellers'" />
      <Other v-if="navigate === 'other'" />
    </v-main>

    <v-bottom-navigation
      fixed
      flat
      dark
      v-model="navigate"
      color="#fff"
      background-color="#333"
      class="pt-2"
    >

      <v-btn value="tickets">
        <span>Tickets</span>
        <v-icon>$tickets</v-icon>
      </v-btn>

      <v-btn value="resellers">
        <span>RSP</span>
        <v-icon>$rsp</v-icon>
      </v-btn>

      <v-btn value="customers">
        <span>End Customers</span>
        <v-icon>$customers</v-icon>
      </v-btn>

      <v-btn value="buildings" @click="redirectToBuildingsAPI">
        <span>Buildings</span>
        <v-icon>$window</v-icon>
      </v-btn>

      <v-btn value="other">
        <span>Other</span>
        <v-icon>$other</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <error-message />
    <simple-message />
  </v-app>
</template>

<style lang="scss">
* {
  user-select: none;
}
tr.v-data-table__expanded.v-data-table__expanded__row {
  background: #444 !important;
  color: #fff !important;
}
tr.v-data-table__expanded.v-data-table__expanded__row .v-icon.v-icon {
  color: #fff !important;
}
.v-application--is-ltr .v-text-field .v-label {
    font-size: 12px !important;
}
table, .v-data-table,
.theme--light.v-expansion-panels .v-expansion-panel,
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: transparent!important;
}
td {
  user-select: text;
}
::-webkit-scrollbar-thumb {
    background: #dadada;
}
</style>

<script>

import 'dgtek-styles'

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    Tickets: () => import('@/components/pages/Tickets'),
    // EndCustomer: () => import('@/components/pages/EndCustomer'),
    RSP: () => import('@/components/pages/RSP'),
    Other: () => import('@/components/pages/Other')
  },
  data: () => ({
    navigate: null,
    buildings: false,
    name: 'Tickets',
    ready: false
  }),
  methods: {
    ...mapActions({
      getUsers: 'GET_USERS'
    }),
    ...mapActions('tariff', {
      getTariffs: 'GET_TARIFFS'
    }),
    ...mapActions('common', {
      fixErrors: 'FIX_DB_ERRORS'
    }),
    ...mapMutations({
      showMessage: 'MESSAGE',
      showError: 'ERROR'
    }),
    async redirectToBuildingsAPI () {
      const { data, error } = await this._getBuildingsAPI()
      if (!error) {
        window.open(data, '_blank')
        this.showMessage({
          message: true,
          messageType: 'Buildings API',
          messageText: 'Welcome!'
        })
      } else {
        this.showError({
          error: true,
          errorType: 'Access failed',
          errorMessage: 'Something went wrong... perhaps you have no access to this API'
        })
      }
    }
  },
  created () {
    this.getTariffs()
    this.getUsers().then(() => { this.ready = true })
  },
  mounted () {
    this.navigate = 'tickets'
  }
}
</script>
