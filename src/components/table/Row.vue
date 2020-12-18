<template>
  <tr @click="callBack">
    <td
      class="grey--text text--darken-3 pt-6 pb-3 px-4"
      v-for="option in options"
      :key="option.prop"
    >
      {{ data[option.prop] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Row',
  props: ['data', 'options', 'click'],
  data () {
    return {}
  },
  methods: {
    callBack () {
      if (this.click) {
        if (this.options.propKey) {
          this.click(this.data[this.options.propKey])
        } else this.click(this.data._id)
      }
    }
  }
}
</script>

<style scoped>
tr {
  cursor: pointer;
}
</style>
