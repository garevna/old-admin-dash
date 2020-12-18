import Vue from 'vue'
import Table from './Table.vue'

const Components = {
  Table
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
