<template>
  <v-container>
    <v-app-bar app>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          RSP
        </v-toolbar-title>
        <v-spacer />
        <Menu :options="menuOptions" :goto.sync="goto" />
      </v-toolbar>
    </v-app-bar>

    <v-row justify="center">
      <Resellers />
      <Reseller v-if="goto === 'reseller'" />
      <EndCustomers v-if="goto === 'customers'" />
      <Traffic v-if="goto === 'traffic'" />
      <Payments v-if="goto === 'payments'"  />
      <Receivables v-if="goto === 'debts'" />
      <Bills v-if="goto === 'bills'" />
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'RSP',
  props: [],

  components: {
    Menu: () => import('@/components/Menu'),
    Resellers: () => import('@/components/pages/rsp/Resellers'),
    Reseller: () => import('@/components/pages/rsp/Reseller'),
    Traffic: () => import('@/components/pages/rsp/Traffic'),
    Payments: () => import('@/components/pages/rsp/Payments'),
    Receivables: () => import('@/components/pages/rsp/Receivables'),
    Bills: () => import('@/components/pages/rsp/Bills'),
    EndCustomers: () => import('@/components/pages/rsp/EndCustomers')
  },

  data: () => ({
    menuOptions: [
      { text: 'List of RSP', value: 'resellers' },
      { text: 'Traffic', value: 'traffic' },
      { text: 'Payments', value: 'payments' },
      { text: 'Accounts receivable', value: 'debts' },
      { text: 'Bills', value: 'bills' },
      { text: 'End Customers', value: 'customers' }
    ],
    goto: 'resellers'
  }),

  computed: {
    ...mapState(['rsp'])
  }
}
</script>
