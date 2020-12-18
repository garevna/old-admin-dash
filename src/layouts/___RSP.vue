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
      <Resellers v-if="goto === 'resellers'" :params="params" />
      <Reseller v-if="goto === 'reseller'" :params="params" />
      <!-- <ClientsOfReseller v-if="goto === 'customers'" :params="params" /> -->
      <EndCustomers v-if="goto === 'customers'" :params="params" />
      <Traffic v-if="goto === 'traffic'" :params="params" />
      <Payments v-if="goto === 'payments'" :params="params" />
      <Receivables v-if="goto === 'debts'" :params="params" />
      <!-- // ?! 'Bills' does not pass /\w/gi && !/\W/gi -->
      <Bills v-if="show('BillsBills')" :params="params" />
    </v-container>
  </div>
</template>

<script>
// import Button from '@/components/Button'
// import ClientsOfReseller from '@/views/ClientsOfReseller'
// import EndCustomers from '@/views/EndCustomers'

export default {
  name: 'RSPLayout',
  props: [],

  components: {
    // Button,
    Menu: () => import('@/components/menu/Menu'),
    // RSPBtnGroup: () => import('@/layouts/RSP/RSPBtnGroup'),
    Resellers: () => import('@/views/Resellers'),
    Reseller: () => import('@/views/Reseller'),
    // ClientsOfReseller,
    // EndCustomers,
    Traffic: () => import('@/views/Traffic'),
    Payments: () => import('@/views/Payments'),
    Receivables: () => import('@/views/Receivables'),
    Bills: () => import('@/views/Bills'),
    EndCustomers: () => import('@/components/EndCustomers')
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
    goto: null,
    name: '',
    params: {},
    resellerId: null,
    acceptBtn: false,
    rejectBtn: false,
    sendBtn: false,
    clientsOfResellerBtn: false
  }),

  methods: {
    // toClientsOfReseller (obj) {
    //   const params = this.$RSPLayoutRouter.getParams()
    //   this.to({ name: 'ClientsOfReseller', params: { id: params.id } })
    // },
    to (obj) {
      this.$RSPLayoutRouter.to(obj)
    },
    show (name) {
      return this.name === name
    },
    callBack ({ name, params }) {
      this.name = name
      this.params = params
      this.resellerId = params.id
    }
  }
  // created () {
  //   this.$RSPLayoutRouter.addListener(this.callBack)
  //   this.to({ name: 'Resellers' })
  //   this.params = this.$RSPLayoutRouter.getParams()
  //   this.name = this.$RSPLayoutRouter.getRouteName()
  // },
  // destroyed () {
  //   this.$RSPLayoutRouter.removeListener(this.callBack)
  // }
}
</script>
