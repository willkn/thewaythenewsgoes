import Vue from 'vue'
import Router from 'vue-router'
import Profiles from '@/components/profiles'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'Profiles',
      component: Profiles
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
    
  ]
})
