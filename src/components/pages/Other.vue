<template>
  <div>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <Menu :options="menuOptions" :goto.sync="goto" />
        <!-- <VideoTutorials /> -->
      </v-toolbar>
    </v-app-bar>

    <v-container>
      <Services v-if="goto === 'services'" />
      <ServiceOrders v-if="goto === 'orders'" />
      <!-- <Wells v-if="goto === 'wells'" /> -->
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Other',
  props: [],

  components: {
    Menu: () => import('@/components/Menu.vue'),
    Services: () => import('@/components/pages/other/Services.vue'),
    ServiceOrders: () => import('@/components/pages/other/ServiceOrders.vue')
    // VideoTutorials: () => import('@/components/pages/other/VideoTutorials.vue')
  },

  data: () => ({
    menuOptions: [
      { text: 'Services', value: 'services' },
      { text: 'Service Orders', value: 'orders' },
      { text: 'Buildings API', value: 'buildings' },
      { text: 'Pits API', value: 'wells' }
    ],
    goto: 'sevices'
  }),

  computed: {
    selectedMenuItem () {
      return this.menuOptions.find(item => item.value === this.goto)
    },
    title () {
      return this.selectedMenuItem ? this.selectedMenuItem.text : ''
    }
  },

  watch: {
    goto: {
      immediate: true,
      handler (val) {
        if (val === 'buildings') {
          window.open('https://garevna.github.io/dgtek-buildings-api/')
        }
      }
    }
  },

  methods: {
    // goto (obj) {
    //   this.$otherLayoutRouter.to(obj)
    // },
    // show (name) {
    //   return this.name === name
    // },
    // callBack ({ name, params }) {
    //   this.name = name
    //   this.params = params
    // }
  }
  // created () {
  //   this.$otherLayoutRouter.addListener(this.callBack)
  //   this.to({ name: 'Services' })
  //   this.params = this.$otherLayoutRouter.getParams()
  //   this.name = this.$otherLayoutRouter.getRouteName()
  // },
  // destroyed () {
  //   this.$otherLayoutRouter.removeListener(this.callBack)
  // }
}
</script>
