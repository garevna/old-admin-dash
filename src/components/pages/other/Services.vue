<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <v-card class="transparent">
          <v-toolbar flat>
            <v-spacer />
            <v-btn icon @click="newService">
              <v-icon>$add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-simple-table
            fixed-header
            height="75vh"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Service Name
                  </th>
                  <th class="text-left">
                    Service Type
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, id) in services"
                  :key="id"
                >
                  <td>{{ item.serviceName.value }}</td>
                  <td>{{ item.serviceType.value }}</td>
                  <td>
                    <v-btn icon @click="edit(item, id)">
                      <v-icon small>$edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="remove(item, id)">
                      <v-icon small>$delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <ServiceForm
          v-if="currentServiceId"
          :id="currentServiceId"
          :service.sync="currentService"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Services',
  components: {
    ServiceForm: () => import('@/components/services/ServiceForm')
  },
  data: () => ({
    currentServiceId: null,
    currentService: null,
    openDetailInfo: false,
    showEdit: false
  }),
  props: [],
  computed: {
    ...mapState('services', ['services'])
  },
  watch: {
    currentService: {
      deep: true,
      handler (val) {
        console.log('CURRENT SERVICE CHANGED:\n', val)
      }
    }
  },
  methods: {
    ...mapActions('services', {
      getAllServices: 'GET_SERVICES',
      createNewService: 'ADD_NEW_SERVICE'
    }),
    newService () {
      console.log('Create')
    },
    edit (item, id) {
      console.log(id)
      console.log(item)
      this.currentServiceId = id
      this.currentService = item
    },
    remove (item, id) {
      console.log(id)
      console.log(item)
    }
  },
  created () {
    this.getAllServices()
  },
  mounted () {}
}
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td{
  font-size: 16px;
}
</style>
