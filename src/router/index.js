import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Rank from '@/page/Rank'
import User from '@/page/User'
import Publish from '@/page/Publish'
import Login from '@/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
