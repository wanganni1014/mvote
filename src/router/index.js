import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Rank from '@/page/Rank'
import User from '@/page/User'
import Publish from '@/page/Publish'

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
      component: User,
      children: [
        {
          path: '/user/publish',
          name: 'Publish',
          component: Publish
        }
      ]
    }
  ]
})
