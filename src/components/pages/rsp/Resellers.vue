<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-card max-width="480" min-width="360" class="mx-auto">
        <v-simple-table height="75vh">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Company
                </th>
                <th class="text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in rsp"
                :key="index"
                @click="currentId = item._id"
              >
                <td>{{ item.company }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <Reseller v-if="currentId" :id="currentId" />
    </v-col>
  </v-row>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Resellers',

  components: {
    Reseller: () => import('@/components/pages/rsp/Reseller.vue')
  },

  data: () => ({
    currentId: null
  }),

  computed: {
    ...mapState(['rsp']),
    reseller () {
      return this.rsp.find(reseller => reseller._id === this.currentId)
    }
  },

  mounted () {
    console.log('MOUNTED:\n', this.rsp)
  }
}
</script>
