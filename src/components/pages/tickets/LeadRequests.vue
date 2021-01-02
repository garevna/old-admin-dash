<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card flat class="transparent pa-4 mt-4 mb-12">
          <v-card-actions>
            <v-spacer />
            <v-btn icon @click="getAllLeadRequests">
              <v-icon color="#444"> mdi-reload </v-icon>
            </v-btn>
          </v-card-actions>
          <v-data-table
            fixed-header
            :headers="headers"
            :items="tickets"
            item-key="_id"
            :sort-by="['createdAt', 'company']"
            :sort-desc="[false, true]"
            multi-sort
            :expanded.sync="expanded"
            single-expand
            show-expand
            class="transparent elevation-0"
            height="70vh"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <UserDetails
                  opened="expanded[0] && expanded[0]._id === item._id"
                  :user.sync="item"
                  :message.sync="message"
                  :role.sync="role"
                />
              </td>
            </template>
            <template v-slot:item.footprint="{ item }">
              <v-simple-checkbox
                v-model="item.footprint"
                disabled
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      class="mr-2"
                      @click="accept(item)"
                      color="#777"
                    >
                      mdi-account-plus
                    </v-icon>
                  </v-btn>
                </template>
                <span>Accept</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      @click="reject(item)"
                      color="#777"
                    >
                      mdi-account-off
                    </v-icon>
                  </v-btn>
                </template>
                <span>Reject</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LeadRequests',
  components: {
    UserDetails: () => import('@/components/pages/tickets/UserDetails.vue')
  },
  data: () => ({
    user: null,
    role: '',
    message: '',
    action: null,
    expanded: []
  }),
  computed: {
    ...mapState('registration', ['tickets']),
    headers () {
      return [
        { text: 'Data', value: 'createdAt' },
        { text: 'Company', value: 'company' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  methods: {
    ...mapActions('registration', {
      getAllLeadRequests: 'GET_TICKETS',
      acceptRequest: 'ACCEPT_TICKET',
      rejectRequest: 'REJECT_TICKET'
    }),
    ...mapMutations({
      showMessage: 'MESSAGE',
      showError: 'ERROR'
    }),
    accept (user) {
      if (!this.role) {
        this.showError({
          error: true,
          errorType: 'Role required',
          errorMessage: 'To accept request you should select a role'
        })
        return
      }
      this.acceptRequest({
        id: user._id,
        payload: {
          accepted: true,
          role: this.role,
          message: this.message
        }
      })
      this.$emit('update:user', null)
    },
    reject (user) {
      this.rejectRequest({
        id: user._id,
        payload: {
          message: this.message
        }
      })
      this.$emit('update:user', null)
    }
  },
  created () {
    this.getAllLeadRequests()
  }
}
</script>
