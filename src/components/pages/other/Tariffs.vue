<template>
  <v-container class="homefone">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card flat class="transparent pa-4 mt-4 mb-12">
          <v-card-actions>
            <v-spacer />
            <v-btn icon @click="create">
              <v-icon>$add</v-icon>
            </v-btn>
          </v-card-actions>
          <v-data-table
            fixed-header
            :headers="headers"
            :items="tariffs"
            item-key="_id"
            :sort-by="['tariffName']"
            :sort-desc="[false]"
            multi-sort
            :expanded.sync="expanded"
            single-expand
            show-expand
            class="transparent elevation-0"
            height="70vh"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <TariffForm
                  :id="item._id"
                  :action.sync="action"
                />
              </td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      class="mr-2"
                      @click="update(item._id)"
                      color="#777"
                    >
                      $save
                    </v-icon>
                  </v-btn>
                </template>
                <span>Save tariff</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      @click="remove(item)"
                      color="#777"
                    >
                      $delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete tariff</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Tariffs',
  components: {
    TariffForm: () => import('@/components/pages/services/TariffForm')
  },
  data: () => ({
    currentTariffId: null,
    currentTariff: null,
    expanded: [],
    action: null,
    headers: [
      {
        text: 'Tariff Name',
        value: 'tariffName'
      },
      {
        text: 'Residential / Commercial',
        value: 'tariffType'
      },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' }
    ]
  }),
  props: [],
  computed: {
    ...mapState('tariff', ['tariffs'])
  },
  watch: {
    action (val) {
      if (val === 'delete') {
        this.remove()
      }
    }
  },
  methods: {
    ...mapActions('tariff', {
      update: 'UPDATE_TARIFF',
      get: 'GET_TARIFFS',
      create: 'CREATE_TARIFF',
      delete: 'DELETE_TARIFF'
    }),
    edit (item, id) {
      if (!id || !item) return
      this.currentTariffId = id
      this.currentTariff = item
    },
    remove (item) {
      if (!item) return
      if (this.currentTariffId === item._id) {
        this.currentTariffId = null
        this.currentTariff = null
      }
      this.delete(item._id)
      this.action = null
    }
  },
  created () {
    this.get()
  }
}
</script>
