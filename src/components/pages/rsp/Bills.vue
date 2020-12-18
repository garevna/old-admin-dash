<template>
  <v-card flat class="mx-auto" max-with="960">
    <h3>Bills of reseller</h3>
    <v-btn text @click="to({ name: 'Reseller', params: { id: params.id } })">back to reseller</v-btn>
  </v-card>
</template>

<script>

export default {
  name: 'Bills',
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
