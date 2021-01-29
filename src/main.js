// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, PullRefresh, Toast, List, Cell, Field, Form, Slider, Popup, Picker, Search } from 'vant'

Vue.config.productionTip = false
Vue.use(Button).use(PullRefresh).use(List).use(Cell).use(Field).use(Form).use(Slider).use(Picker).use(Popup).use(Search).use(Toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
