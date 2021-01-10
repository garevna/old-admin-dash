<template>
  <v-container fluid fill-height class="homefone">
    <v-navigation-drawer
        dark
        app
        v-model="drawer"
        :mini-variant.sync="mini"
        :mini-variant-width="60"
        permanent
      >
        <v-list-item class="px-2 my-2">
          <v-list-item-title>
            <v-btn icon @click="mini = !mini">
              <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
            </v-btn>
          </v-list-item-title>
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
            <v-list-item-title class="text-left">
              {{ item.companyName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-row justify="center">
      <ServiceDetails
        v-if="currentOrderId"
        :data.sync="currentOrder"
        class="mt-12"
      />
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ServiceOrders',
  components: {
    ServiceDetails: () => import('@/components/pages/service-orders/ServiceDetails.vue')
  },
  data: () => ({
    currentOrderId: null,
    drawer: true,
    mini: true
  }),
  computed: {
    ...mapState('service-orders', ['serviceOrders']),
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
    ...mapActions('service-orders', {
      getOrders: 'GET_SERVICE_ORDERS'
    }),
    click (item) {
      this.mini = true
      this.currentOrderId = item._id
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
