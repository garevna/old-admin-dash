<template>
  <v-card min-width="360" max-width="480" class="pa-4">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        <h5>{{ reseller.company }}</h5>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" >
            <v-icon>$menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuOptions"
            :key="index"
          >
            <v-list-item-title @click="goto = item.value">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-simple-table dark max-height="75vh">
      <template v-slot:default>
        <tbody>
          <tr>
            <td><small>Company</small></td>
            <td>{{ reseller.company }}</td>
          </tr>
          <tr>
            <td><small>Name</small></td>
            <td>{{ reseller.name }}</td>
          </tr>
          <tr>
            <td><small>ABN</small></td>
            <td>{{ reseller.abn }}</td>
          </tr>
          <tr>
            <td><small>Address</small></td>
            <td>{{ reseller.address }}</td>
          </tr>
          <tr>
            <td><small>Email</small></td>
            <td>{{ reseller.email }}</td>
          </tr>
          <tr>
            <td><small>Phone</small></td>
            <td>{{ reseller.phone }}</td>
          </tr>
          <tr>
            <td><small>Contact person</small></td>
            <td>{{ reseller.contactPersonDetails }}</td>
          </tr>
          <tr>
            <td><small>Contact Phone</small></td>
            <td>{{ reseller.contactNumber }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <EndCustomers v-if="goto === 'customers'" />
    <Traffic v-if="goto === 'traffic'" />
    <Payments v-if="goto === 'payments'"  />
    <Receivables v-if="goto === 'debts'" />
    <Bills v-if="goto === 'bills'" />
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Reseller',

  components: {
    Traffic: () => import('@/components/pages/rsp/Traffic'),
    Payments: () => import('@/components/pages/rsp/Payments'),
    Receivables: () => import('@/components/pages/rsp/Receivables'),
    Bills: () => import('@/components/pages/rsp/Bills'),
    EndCustomers: () => import('@/components/pages/rsp/EndCustomers')
  },

  props: ['id'],

  data: () => ({
    goto: null,
    menuOptions: [
      { text: 'Traffic', value: 'traffic' },
      { text: 'Payments', value: 'payments' },
      { text: 'Accounts receivable', value: 'debts' },
      { text: 'Bills', value: 'bills' },
      { text: 'End Customers', value: 'customers' }
    ]
  }),

  computed: {
    ...mapState({
      resellersData: 'rsp'
    }),
    reseller () {
      return this.resellersData.find(reseller => reseller._id === this.id)
    }
  }
}
</script>

<style scoped>
td, th {
  color: #fff !important;
}
small {
  color: #888;
}
h5 {
  font-size: 1.2rem;
  color: #555;
}
</style>
