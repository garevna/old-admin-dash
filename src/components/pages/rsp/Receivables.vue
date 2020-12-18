<template>
  <v-row>
    <v-col cols="12" md="12">
      <h3>Receivables of reseller</h3>
      <!-- <v-btn text @click="to({ name: 'Reseller', params: { id: params.id } })">back to reseller</v-btn> -->
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Receivables',
  props: [],

  components: {
  },

  data: () => ({
    params: null
  }),
  computed: {
  },
  methods: {
    to (obj) {
      this.$RSPLayoutRouter.to(obj)
    }
  },
  mounted () {
    this.params = this.$RSPLayoutRouter.getParams()
  }
}
</script>
