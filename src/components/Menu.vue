<template>
    <v-menu
      v-model="isOpened"
      bottom
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="isOpened = true">
          <v-icon large>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in options"
          :key="index"
          @click="$emit('update:goto', item.value)"
        >
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  props: ['options', 'goto'],
  name: 'Menu',
  components: {
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-key-chain-variant',
          text: 'Access',
          value: 'access'
        },
        {
          icon: 'mdi-credit-card-settings-outline',
          text: 'Payments',
          value: 'payments'
        }
      ],
      selection: 0,
      isOpened: false
    }
  }
}
</script>
