<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5" xl="3">
        <v-card class="transparent">
          <v-toolbar dark>
            <v-spacer />
            <v-btn icon @click="createNewService">
              <v-icon>$add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-simple-table
            fixed-header
            max-height="500"
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

      <v-col cols="12" md="6" lg="5" xs="3">
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
    ServiceForm: () => import('@/components/pages/services/ServiceForm')
  },
  data: () => ({
    currentServiceId: null,
    currentService: null
  }),
  props: [],
  computed: {
    ...mapState('services', ['services'])
  },
  methods: {
    ...mapActions('services', {
      updateServices: 'UPDATE_SERVICES',
      updateService: 'UPDATE_SERVICE',
      getAllServices: 'GET_SERVICES',
      createNewService: 'CREATE_SERVICE',
      deleteService: 'DELETE_SERVICE'
    }),
    edit (item, id) {
      if (!id || !item) return
      this.currentServiceId = id
      this.currentService = item
    },
    remove (item, id) {
      if (this.currentServiceId === id) {
        this.currentServiceId = null
        this.currentService = null
      }
      this.deleteService(id)
    }
  },
  created () {
    this.getAllServices()
  }
}
</script>
