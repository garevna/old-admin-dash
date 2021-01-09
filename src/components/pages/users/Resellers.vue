<template>
  <v-container fluid fill-height>
    <v-navigation-drawer
      dark
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      :mini-variant-width="100"
      width="320"
      permanent
    >
      <v-list-item class="px-2 my-2">
        <v-list-item-title>
          <v-btn text @click="mini = !mini">
            RSP
            <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(item, index) in rsp"
          :key="index"
          link
        >
          <v-list-item-icon></v-list-item-icon>
          <v-list-item-content @click="click(item)">
            <v-list-item-title class="text-left">
              {{ item.company || item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <Profile
      v-if="reseller && goto === 'profile'"
      :id="reseller._id"
    />
    <Traffic
      v-if="reseller && goto === 'traffic'"
      :id="reseller._id"
    />
    <EndCustomers
      v-if="reseller && goto === 'customers'"
      :id="reseller._id"
    />
    <Bills
      v-if="reseller && goto === 'bills'"
      :id="reseller._id"
    />

    <Archive
      v-if="goto === 'archive'"
      :resellerId="reseller._id"
    />
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Resellers',
  components: {
    // CorporatePartnerIcon: () => import('@/components/icons/CorporatePartner.vue'),
    Profile: () => import('@/components/pages/users/Profile.vue'),
    Traffic: () => import('@/components/pages/users/Traffic'),
    EndCustomers: () => import('@/components/pages/users/EndCustomers'),
    Bills: () => import('@/components/pages/users/Bills'),
    Archive: () => import('@/components/pages/tickets/Archive.vue')
  },

  props: ['id', 'goto'],

  data: () => ({
    currentId: null,
    drawer: true,
    mini: false
  }),

  computed: {
    ...mapState(['users']),
    rsp () {
      return this.users.filter(user => user.role === 'RSP')
    },
    reseller () {
      return this.rsp.find(user => user._id === this.currentId)
    }
  },

  watch: {
    currentId (val) {
      this.$emit('update:id', val)
      this.goto === 'archive' && this.getTikets(val)
    },
    goto (val) {
      val === 'archive' && this.getTikets(this.currentId)
    }
  },

  methods: {
    ...mapActions('address-requests', {
      getTikets: 'GET_ARCHIVE'
    }),
    click (item) {
      this.mini = true
      this.currentId = item._id
    }
  }
}
</script>
