import Vue from 'vue'
import VueRouter from 'vue-router'
// import RegistrationRequests from '@/views/RegistrationRequests.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'RegistrationRequests',
  //   component: RegistrationRequests
  // },
  // {
  //   path: '/services',
  //   name: 'Services',
  //   component: () => import(/* webpackChunkName: "services" */ '@/views/Services.vue')
  // },
  // { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
