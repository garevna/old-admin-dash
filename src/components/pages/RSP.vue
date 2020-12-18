<template>
  <div>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          RSP
        </v-toolbar-title>
        <v-spacer />

        <!-- <RSPBtnGroup
          :accept.sync="acceptBtn"
          :reject.sync="rejectBtn"
          :send.sync="sendBtn"
        /> -->
        <Menu :options="menuOptions" :goto.sync="goto" />
      </v-toolbar>
    </v-app-bar>

    <v-container>
      <Resellers :params="params" />
      <Reseller v-if="goto === 'reseller'" :params="params" />
      <!-- <ClientsOfReseller v-if="goto === 'customers'" :params="params" /> -->
      <EndCustomers v-if="goto === 'customers'" :params="params" />
      <Traffic v-if="goto === 'traffic'" :params="params" />
      <Payments v-if="goto === 'payments'" :params="params" />
      <Receivables v-if="goto === 'debts'" :params="params" />
      <Bills v-if="goto === 'bills'" :params="params" />
    </v-container>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'RSPLayout',
  props: [],

  components: {
    Menu: () => import('@/components/Menu'),
    Resellers: () => import('@/components/pages/rsp/Resellers'),
    Reseller: () => import('@/components/pages/rsp/Reseller'),
    Traffic: () => import('@/components/pages/rsp/Traffic'),
    Payments: () => import('@/components/pages/rsp/Payments'),
    Receivables: () => import('@/components/pages/rsp/Receivables'),
    Bills: () => import('@/components/pages/rsp/Bills'),
    EndCustomers: () => import('@/components/pages/EndCustomers')
  },

  data: () => ({
    // menuOptions: require('@/components/menu/menu-options-for-rsp-layout.json'),
    menuOptions: [
      { text: 'Traffic', value: 'traffic' },
      { text: 'Payments', value: 'payments' },
      { text: 'Accounts receivable', value: 'debts' },
      { text: 'Bills', value: 'bills' },
      { text: 'List of RSP', value: 'resellers' },
      { text: 'List of End Customers', value: 'customers' }
    ],
    goto: 'resellers',
    name: '',
    params: {},
    resellerId: null,
    acceptBtn: false,
    rejectBtn: false,
    sendBtn: false,
    clientsOfResellerBtn: false
  }),

  computed: {
    ...mapState(['rsp'])
  },

  methods: {
    // ...mapActions({
    //   saveRSP: 'POST_RSP'
    // }),
    testRSP () {
      // const rsp = require('@/config/resellers/mock-rsp-data.json')
      // console.log('RSP:\n', rsp)
      // for (const reseller of rsp) {
      //   this.saveRSP(reseller)
      // }
    }
  },
  mounted () {
    this.testRSP()
  }
}
</script>
