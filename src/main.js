import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

import 'dgtek-styles/css/fonts.scss'
import 'dgtek-styles/css/variables.scss'

Vue.config.productionTip = false

Vue.prototype._readFile = require('@/helpers/readFile').default

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
