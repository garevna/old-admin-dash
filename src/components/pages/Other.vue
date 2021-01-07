<template>
  <v-container fluid>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          <h5><v-icon color="#900">{{ icon }}</v-icon> {{ title }}</h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip
          bottom
          color="primary"
          v-for="(item, index) in menuOptions"
          :key="index"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              :color="goto !== item.value ? '#333' : 'primary'"
              dark
              v-on="on"
              @click="goto = item.value"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
      </v-toolbar>
    </v-app-bar>

    <v-row justify="center">
      <VideoTutorials v-if="goto === 'tutorials'" />
      <Tariffs v-if="goto === 'tariffs'" />
      <Services v-if="goto === 'services'" />
      <ServiceOrders v-if="goto === 'orders'" />
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Other',

  components: {
    Tariffs: () => import('@/components/pages/other/Tariffs.vue'),
    Services: () => import('@/components/pages/other/Services.vue'),
    ServiceOrders: () => import('@/components/pages/other/ServiceOrders.vue'),
    VideoTutorials: () => import('@/components/pages/other/VideoTutorials.vue')
  },

  data: () => ({
    menuOptions: [
      {
        text: 'Video Tutorials',
        value: 'tutorials',
        icon: '$tutorials'
      },
      {
        text: 'Tariffs',
        value: 'tariffs',
        icon: '$tariff'
      },
      {
        text: 'Services',
        value: 'services',
        icon: '$services'
      },
      {
        text: 'Service Orders',
        value: 'orders',
        icon: '$orders'
      }
    ],
    goto: 'services'
  }),

  computed: {
    selectedMenuItem () {
      return this.menuOptions.find(item => item.value === this.goto)
    },
    title () {
      return this.selectedMenuItem ? this.selectedMenuItem.text : ''
    },
    icon () {
      return this.selectedMenuItem ? this.selectedMenuItem.icon : ''
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
