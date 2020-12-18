<template>
  <v-container>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          End Customers
        </v-toolbar-title>
        <v-spacer />

        <Menu :options="menuOptions" :callBack="to" />
      </v-toolbar>
    </v-app-bar>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card max-width="480" min-height="300" class="pa-4">
          List of customers
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card max-width="480" min-height="300" class="pa-4">
          End Customer Details
          <!-- <EndCustomer v-if="show('EndCustomer')" :params="params" /> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Button from '@/components/Button'

export default {
  name: 'EndCustomerLayout',
  props: [],

  components: {
    // Button,
    // EndCustomer: () => import('@/components/EndCustomer'),
    Menu: () => import('@/components/Menu')
  },

  data: () => ({
    // menuOptions: require('@/components/menu/menu-options-for-end-customer-layout.json'),
    menuOptions: [
      {
        text: 'Traffic',
        value: 'traffic'
      },
      {
        text: 'Payments',
        value: 'payments'
      },
      {
        text: 'Payment details',
        value: 'details'
      }
    ],
    name: '',
    params: null
  }),

  methods: {
    to (obj) {
      this.$endCustomerLayoutRouter.to(obj)
    },
    show (name) {
      return this.name === name
    },
    callBack ({ name, params }) {
      this.name = name
      this.params = params
    }
  }
  // created () {
  //   this.$endCustomerLayoutRouter.addListener(this.callBack)
  //   this.to({ name: 'EndCustomer' })
  //   this.params = this.$endCustomerLayoutRouter.getParams()
  //   this.name = this.$endCustomerLayoutRouter.getRouteName()
  // },
  // destroyed () {
  //   this.$endCustomerLayoutRouter.removeListener(this.callBack)
  // }
}
</script>
