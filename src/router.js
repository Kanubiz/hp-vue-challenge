import Vue from 'vue'
import Router from 'vue-router'
import Masks from './components/Masks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Masks',
      component: Masks
    }
  ]
})