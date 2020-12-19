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

import { mapState, /* mapMutations, */ mapActions } from 'vuex'

export default {
  name: 'Services',
  components: {
    ServiceForm: () => import('@/components/services/ServiceForm')
  },
  data: () => ({
    currentServiceId: null,
    currentService: null
  }),
  props: [],
  computed: {
    ...mapState('services', ['services'])
  },
  watch: {
    services: {
      immediate: true,
      deep: true,
      handler (val) {
        console.log('SERVICES CHANGED\n', val)
      }
    }
  },
  methods: {
    ...mapActions('services', {
      updateServices: 'UPDATE_SERVICES',
      updateService: 'UPDATE_SERVICE',
      getAllServices: 'GET_SERVICES',
      createNewService: 'CREATE_SERVICE',
      deleteService: 'DELETE_SERVICE'
    }),
    async newService () {
      const { id, service } = await this.createNewService()
      console.log(id, service)
      console.log(Object.keys(this.services))
    },
    edit (item, id) {
      console.log(id)
      console.log(item)
      if (!id || !item) return
      this.currentServiceId = id
      this.currentService = item
    },
    async remove (item, id) {
      if (this.currentServiceId === id) {
        this.currentServiceId = null
        this.currentService = null
      }
      await this.deleteService(id)
      console.log(Object.keys(this.services))
    }
  },
  created () {
    this.getAllServices()
  }
}
</script>
