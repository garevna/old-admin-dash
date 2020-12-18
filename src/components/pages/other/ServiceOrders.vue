<template>
  <div>
    <h2 class="text-center">Service orders</h2>
    <v-card>
      <Table
        :data="serviceOrders"
        :options="options"
        :callBack="callBack"
      /> </v-card
    ><v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Service order</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <ServiceDetail v-if="currentOrder" :data="currentOrder" />
        </v-container>
        <v-card-actions class="d-flex justify-center">
          <!-- <v-btn>some btn</v-btn>
          <v-btn>some btn</v-btn>
          <v-btn>some btn</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.info-section {
}
</style>

<script>
import Table from '@/components/table/Table'
import ServiceDetail from '@/components/service-orders/ServiceDetail'
import orders from '@/components/service-orders/mockData'
import options from '@/components/service-orders/options'

export default {
  name: 'ServiceOrders',
  components: {
    Table,
    ServiceDetail
  },
  data: () => ({
    serviceOrders: [],
    currentOrderId: null,
    dialog: false,
    options
  }),
  computed: {
    currentOrder () {
      return this.serviceOrders.find(order => order._id === this.currentOrderId)
    }
  },
  watch: {
    currentOrderId (val) {
      if (!val) return
      this.dialog = true
    }
  },
  methods: {
    callBack (id) {
      console.log(id)
      this.currentOrderId = id
    }
  },
  beforeMount () {},
  mounted () {
    const arr = new Array(4)
    arr.fill(orders[0])
    arr.forEach((order, index) => {
      order._id += index
    })
    this.serviceOrders = arr
  },
  destroyed () {}
}
</script>
