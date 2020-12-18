<template>
  <tr>
    <th
      v-for="option in options"
      :key="option.header"
      class="text-left headline text-uppercase primary--text py-5"
      :style="`${option.style}`"
    >
      {{ option.header }}
    </th>
  </tr>
</template>

<script>
export default {
  name: 'Header',
  props: ['options']
}
</script>

<style scoped>
</style>
