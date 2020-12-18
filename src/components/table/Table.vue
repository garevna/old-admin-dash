<template>
  <v-simple-table fixed-header :height="height">
    <template v-slot:default>
      <thead>
        <Header :options="options" />
      </thead>
      <tbody>
        <Row
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          :options="options"
          :click="currId"
          :class="{ active: curr === item._id }"
        />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Header from './Header'
import Row from './Row'

export default {
  name: 'Table',
  props: ['data', 'options', 'callBack', 'height'],
  components: {
    Row,
    Header
  },
  data: () => ({
    curr: null
  }),
  computed: {},
  methods: {
    currId (id) {
      this.curr = id
      this.callBack(id)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style>
</style>

<style lang="scss">
// .active {
//   background-color: #bfbfbf !important;
// }
</style>
