<template>
  <v-container fluid class="homefone mt-4 mb-12 pb-12">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="transparent pa-4 mx-auto">
          <v-simple-table
            fixed-header
            height="75%"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th style="width: 160px"> Date (created) </th>
                  <th style="width: 340px"> Company </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in tickets"
                  :key="index"
                  @click="rowClickHandler(item._id)"
                >
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.company }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        </v-col>
      <v-col cols="12" md="6" lg="5">
        <UserDetails
          v-if="user"
          :user.sync="user"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'LeadRequests',
  components: {
    UserDetails: () => import('@/components/pages/tickets/UserDetails.vue')
  },
  data: () => ({
    user: null,
    action: null
  }),
  computed: {
    ...mapState('registration', ['tickets'])
  },
  methods: {
    ...mapActions('registration', {
      getAllLeadRequests: 'GET_TICKETS'
    }),
    rowClickHandler (id) {
      this.user = this.tickets.find(item => item._id === id)
    }
  },
  created () {
    this.getAllLeadRequests()
  }
}
</script>
