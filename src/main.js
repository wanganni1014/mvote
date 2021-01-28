// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, PullRefresh, Toast, List, Cell } from 'vant'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
