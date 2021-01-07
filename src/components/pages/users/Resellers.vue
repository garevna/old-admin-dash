<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card flat class="transparent pa-4 mt-4 mb-12">
          <v-data-table
            fixed-header
            :headers="headers"
            :items="rsp"
            item-key="_id"
            :sort-by="['company', 'name']"
            :sort-desc="[false, false]"
            multi-sort
            :expanded.sync="expanded"
            single-expand
            show-expand
            class="transparent elevation-0"
            height="70vh"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <Profile
                  v-if="goto === 'profile'"
                  opened="expanded[0] && expanded[0]._id === item._id"
                  :id.sync="item._id"
                />
                <Traffic
                  v-if="goto === 'traffic'"
                  :id.sync="item._id"
                />
                <EndCustomers
                  v-if="goto === 'customers'"
                  :id.sync="item._id"
                />
                <Bills
                  v-if="goto === 'bills'"
                  :id.sync="item._id"
                />
              </td>
            </template>
            <template v-slot:item.footprint="{ item }">
              <v-simple-checkbox
                v-model="item.footprint"
                disabled
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.actions>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      @click="goto = 'customers'"
                      color="#777"
                    >
                      mdi-account-off
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete RSP</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Resellers',

  components: {
    Profile: () => import('@/components/pages/users/Profile.vue'),
    Traffic: () => import('@/components/pages/users/Traffic'),
    EndCustomers: () => import('@/components/pages/users/EndCustomers'),
    Bills: () => import('@/components/pages/users/Bills')
  },

  props: ['id', 'goto'],

  data: () => ({
    currentId: null,
    expanded: [],
    headers: [
      { text: 'Company', value: 'company' },
      { text: 'Name', value: 'name' },
      { text: '', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' }
    ]
  }),

  computed: {
    ...mapState(['users']),
    rsp () {
      return this.users.filter(user => user.role === 'RSP')
    },
    reseller () {
      return this.users.find(user => user._id === this.id)
    }
  },

  watch: {
    currentId (val) {
      this.$emit('update:id', val)
    }
  }
}
</script>
