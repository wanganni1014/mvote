import Vue from 'vue'
import Router from 'vue-router'
import Poster from '@/page/Poster'
import Home from '@/page/Home'
import Rank from '@/page/Rank'
import User from '@/page/User'
import Publish from '@/page/Publish'
import Login from '@/page/Login'
// import Audit from '@/page/Audit'
import Search from '@/page/Search'
import Detail from '@/page/Detail'
import Introduce from '@/page/Introduce'
import Rule from '@/page/Rule'
import MyVideo from '@/page/Mine'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Poster',
    component: Poster
  },
  {
    path: '/index',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
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
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule
  },
  {
    path: '/myVideo',
    name: 'MyVideo',
    component: MyVideo
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  ]
})
