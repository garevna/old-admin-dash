<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="transparent">
          <!-- <Table :data="tickets" :options="options" :callBack="callBack" /> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <CommonDetails :id.sync="currentId"/>
          <!-- <p
            class="text-center headline text-uppercase primary--text py-5 mb-0"
          >
            Settings
          </p>
          <v-divider></v-divider>
          <TableDetail :data="currentTicket" :options="detailInfo" /> -->
          <v-card-actions class="d-flex justify-center">
            <v-btn text> accept </v-btn>
            <v-btn text> reject </v-btn>
            <v-btn text> send </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

// import Table from '@/components/table/Table'
import CommonDetails from '@/components/pages/tickets/CommonDetails.vue'
// import TicketDetail from '@/components/table/TicketDetail.vue'

export default {
  name: 'Common',
  props: ['accept', 'reject', 'send'],

  components: {
    CommonDetails
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
  watch: {
    accept (val) {
      if (!val) return
      console.log('accept')
      this.$emit('update:accept', false)
    },
    reject (val) {
      if (!val) return
      console.log('reject')
      this.$emit('update:reject', false)
    },
    send (val) {
      if (!val) return
      console.log('send')
      this.$emit('update:send', false)
    },
    currentId (val) {
      if (!val) return
      this.dialog = true
    }
  },
  methods: {
    callBack (id) {
      this.currentId = id
    }
  },
  created () {
    this.$store.dispatch('common/GET_TICKETS')
  }
}
</script>
