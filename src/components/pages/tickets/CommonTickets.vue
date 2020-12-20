<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="3">
        <v-card flat class="transparent" max-height="75%">
          <v-simple-table
            fixed-header
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
                  @click="currentId = item._id"
                >
                  <td> {{ item.createdAt }} </td>
                  <td> {{ item.rsp.company }} </td>
                  <!-- <td> {{ item.rsp.email }} </td>
                  <td> {{ item.rsp.phone }} </td>
                  <td> {{ item.rsp.contactPersonDetails }} </td> -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <v-card max-height="50%">
          <CommonDetails :id.sync="currentId"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Common',
  props: ['accept', 'reject', 'send'],

  components: {
    CommonDetails: () => import('@/components/pages/tickets/CommonDetails.vue')
  },

  data: () => ({
    currentId: null,
    dialog: false,
    detailInfo: [
      {
        text: 'Name',
        prop: 'name'
      },
      {
        text: 'Email',
        prop: 'email'
      },
      {
        text: 'Subject',
        prop: 'subject'
      },
      {
        text: 'Description',
        prop: 'description'
      }
    ],
    options: [
      {
        header: 'Name',
        style: 'width:15%;',
        prop: 'name'
      },
      {
        header: 'Email',
        style: 'width:25%;',
        prop: 'email'
      },
      {
        header: 'Subject',
        style: 'width:10%;',
        prop: 'subject'
      },
      {
        header: 'Description',
        style: 'width:50%;',
        prop: 'description'
      }
    ]
  }),
  computed: {
    ...mapState('common', ['tickets', 'ticketsError', 'ticketsLoading']),
    currentTicket () {
      return this.tickets.find(ticket => ticket._id === this.currentId)
    }
  },
  methods: {
    ...mapActions('common', {
      getTickets: 'GET_TICKETS'
    })
  },
  created () {
    this.getTickets()
  }
}
</script>
