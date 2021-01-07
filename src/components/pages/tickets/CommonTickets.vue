<template>
  <v-container class="homefone" :style="{ opacity: blur, transition: 'all .5s ease' }">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card flat class="transparent pa-4 mt-4 mb-12">
          <v-card-actions>
            <v-spacer />
            <v-btn icon @click="reload">
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
                <CommonDetails
                  opened="expanded[0] && expanded[0]._id === item._id"
                  :id="item._id"
                />
              </td>
            </template>
            <template v-slot:item.notAnswered="{ item }">
              <v-icon color="#900">
                {{ notAnswered(item) ? 'mdi-comment-question' : '' }}
              </v-icon>
            </template>
            <template v-slot:item.role="{ item }">
              <v-chip
                :color="!item.role ? '#900' : item.role === 'RSP' ? '#555' : '#fa0'"
                dark
              >
                <small>{{ item.role || '?' }}</small>
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      class="mr-2"
                      @click="archive(item)"
                      color="#777"
                    >
                      $archive
                    </v-icon>
                  </v-btn>
                </template>
                <span>Move to archive</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      @click="remove(item._id)"
                      color="#777"
                    >
                      $delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete ticket</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Common',
  props: ['accept', 'reject', 'send'],

  components: {
    CommonDetails: () => import('@/components/pages/tickets/CommonDetails.vue')
  },

  data: () => ({
    messageBack: '',
    expanded: [],
    blur: 1
  }),
  computed: {
    ...mapState('common', ['tickets']),
    headers () {
      return [
        {
          text: 'Waiting',
          value: 'notAnswered'
        },
        { text: 'Data', value: 'createdAt' },
        { text: 'Role', value: 'role' },
        { text: 'Company', value: 'company' },
        { text: 'Subject', value: 'subject' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' }
      ]
    },
    currentTicket () {
      return this.tickets.find(ticket => ticket._id === this.currentId)
    }
  },
  watch: {
    tickets: {
      immediate: true,
      deep: true,
      handler (val) {
        this.blur = 1
      }
    }
  },
  methods: {
    ...mapActions('common', {
      getTickets: 'GET_TICKETS',
      remove: 'REMOVE_TIKET'
    }),
    ...mapGetters(['rsp', 'corporateClient']),
    reload () {
      this.expanded = []
      this.blur = 0
      this.getTickets()
    },
    notAnswered (item) {
      return !item.history.length || item.history[item.history.length - 1].emitor !== 'admin'
    }
  },
  created () {
    this.getTickets()
  }
}
</script>
