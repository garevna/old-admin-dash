<template>
  <v-container class="mb-12">
    <v-navigation-drawer absolute
      floating
      class="homefone"
      v-model="drawer"
      :mini-variant.sync="mini"
      width="480"
    >
        <v-list-item class="px-2">
          <v-btn icon large>
            <v-icon>$pdf</v-icon>
          </v-btn>

          <v-list-item-title class="ml-4">
            <v-row>
              <v-col cols="6">
                <small>Company</small>
              </v-col>
              <v-col cols="6">
                <small>Product/Service Type</small>
              </v-col>
            </v-row>

          </v-list-item-title>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-menu-left-outline</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in serviceOrders"
            :key="index"
            link
          >
            <v-list-item-icon></v-list-item-icon>

          <v-list-item-content @click="click(item)">
            <v-row>
              <v-col cols="6">
                <v-list-item-title class="text-left">{{ item.companyName }}</v-list-item-title>
              </v-col>
              <v-col cols="6">
                <v-list-item-title class="text-left">{{ item.product }}</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <ServiceDetails
      v-if="currentOrderId"
      :data.sync="currentOrder"
      class="mt-12"
    />
  </v-container>
</template>

<script>

export default {
  name: 'ServiceOrders',
  components: {
    ServiceDetails: () => import('@/components/pages/service-orders/ServiceDetails.vue')
  },
  data: () => ({
    serviceOrders: require('@/config/service-orders-mock-data').default,
    currentOrderId: null,
    drawer: true,
    mini: true
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
    click (item) {
      this.mini = true
      this.currentOrderId = item._id
    }
  }
}
</script>
