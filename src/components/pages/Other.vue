<template>
  <v-container fluid>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          <h5>{{ title }}</h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <Menu :options="menuOptions" :goto.sync="goto" />
      </v-toolbar>
    </v-app-bar>

    <v-row justify="center">
      <VideoTutorials v-if="goto === 'tutorials'" />
      <Services v-if="goto === 'services'" />
      <ServiceOrders v-if="goto === 'orders'" />
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Other',

  components: {
    Menu: () => import('@/components/Menu.vue'),
    Services: () => import('@/components/pages/other/Services.vue'),
    ServiceOrders: () => import('@/components/pages/other/ServiceOrders.vue'),
    VideoTutorials: () => import('@/components/pages/other/VideoTutorials.vue')
  },

  data: () => ({
    menuOptions: [
      { text: 'Video Tutorials', value: 'tutorials' },
      { text: 'Services', value: 'services' },
      { text: 'Service Orders', value: 'orders' },
      { text: 'Pits API', value: 'wells' }
    ],
    goto: 'services'
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
