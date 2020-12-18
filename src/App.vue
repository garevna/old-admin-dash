<template>
  <v-app>
    <v-main v-if="ready">
      <Tickets v-if="!navigate || navigate === 'tickets'" />
      <!-- <EndCustomer v-if="navigate === 'customers'" /> -->
      <RSP v-if="navigate === 'resellers'" />
      <Other v-if="navigate === 'other'" />
    </v-main>

    <v-bottom-navigation fixed v-model="navigate" color="#079" class="py-1">

      <v-btn value="tickets">
        <span>Tickets</span>
        <v-icon>$tickets</v-icon>
      </v-btn>

      <v-btn value="resellers">
        <span>RSP</span>
        <v-icon>$accounts</v-icon>
      </v-btn>

      <v-btn value="customers">
        <span>End Customers</span>
        <v-icon>$customers</v-icon>
      </v-btn>

      <v-btn value="buildings" @click="redirectToBuildingsAPI">
        <span>Buildings API</span>
        <v-icon>$buildings</v-icon>
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
</style>

<script>

import 'dgtek-styles'

import { mapActions } from 'vuex'

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
      getRSP: 'GET_RSP'
    }),
    redirectToBuildingsAPI () {
      window.open('https://garevna.github.io/dgtek-buildings-api/')
    }
  },
  created () {
    this.getRSP().then(() => { this.ready = true })
  },
  mounted () {
    this.navigate = 'tickets'
  }
}
</script>
