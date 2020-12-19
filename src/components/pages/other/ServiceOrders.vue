<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="12" lg="4">
        <v-card flat class="transparent my-2 mx-0">
          <v-simple-table
            fixed-header
            max-height="75%"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th style="width: 160px"> Product/Service Type </th>
                  <th style="width: 340px"> Company Name </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in serviceOrders"
                  :key="index"
                  @click="currentOrderId = item._id"
                >
                  <td>{{ item.product }}</td>
                  <td>{{ item.companyName }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
        <ServiceDetails
          v-if="currentOrderId"
          :data.sync="currentOrder"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.info-section {
}
</style>

<script>

export default {
  name: 'ServiceOrders',
  components: {
    ServiceDetails: () => import('@/components/pages/service-orders/ServiceDetails.vue')
  },
  data: () => ({
    serviceOrders: require('@/config/service-orders-mock-data').default,
    currentOrderId: null,
    dialog: false
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
  }
}
</script>
