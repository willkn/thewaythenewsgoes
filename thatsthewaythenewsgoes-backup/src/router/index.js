import Vue from 'vue'
import Router from 'vue-router'
import search from '@/components/search'
import cells from '@/components/cells'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: "Search",
      component: search
    },
    {
      path: '/',
      name: 'Home',
      component: cells
    }
  ]
})
