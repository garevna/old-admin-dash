<template>
  <v-card flat class="transparent my-8 mx-auto" v-if="edited">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field
          label="Tariff Name"
            v-model="tariffName"
            dense
            :rules="[rules.required]"
          ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field
          label="Downstream Speed"
            v-model="downstreamSpeed"
            :rules="[rules.onlyDigits, rules.required]"
            dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field
          label="Upstream Speed"
            v-model="upstreamSpeed"
            :rules="[rules.onlyDigits, rules.required]"
            dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field
          label="Data Limit"
          v-model="dataLimit"
          :rules="[rules.required]"
          dense
      ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field
          label="Price"
            v-model="price"
            prefix="$"
            :rules="[rules.onlyDigits, rules.required]"
            dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  props: ['id'],
  data () {
    return {
      rules: {
        required: v => !!v || 'Required',
        onlyDigits: v => !/\D/g.test(v) || 'Digits only'
      }
    }
  },
  computed: {
    ...mapState('tariff', ['tariffs']),
    edited: {
      get () {
        return this.tariffs.find(item => item._id === this.id)
      }
    },
    tariffName: {
      get () {
        return this.edited.tariffName
      },
      set (val) {
        this.update(Object.assign({}, this.edited, { tariffName: val }))
      }
    },
    price: {
      get () {
        return this.edited.price
      },
      set (val) {
        this.update(Object.assign({}, this.edited, { price: val }))
      }
    },
    dataLimit: {
      get () {
        return this.edited.dataLimit
      },
      set (val) {
        this.update(Object.assign({}, this.edited, { dataLimit: val }))
      }
    },
    downstreamSpeed: {
      get () {
        return this.edited.downstreamSpeed
      },
      set (val) {
        this.update(Object.assign({}, this.edited, { downstreamSpeed: val }))
      }
    },
    upstreamSpeed: {
      get () {
        return this.edited.upstreamSpeed
      },
      set (val) {
        this.update(Object.assign({}, this.edited, { upstreamSpeed: val }))
      }
    }
  },
  methods: {
    ...mapMutations('tariff', {
      updateTariff: 'UPDATE_TARIFF_BY_ID'
    }),
    update (tariff) {
      this.updateTariff({ id: tariff._id, value: tariff })
    }
  }
}
</script>
