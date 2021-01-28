<template>
  <div>
    <van-tabbar route>
        <van-tabbar-item replace to="/"  icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/rank"  icon="friends-o">排名</van-tabbar-item>
        <van-tabbar-item replace to="/user"  icon="setting-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  name: 'Tabbar'
}
</script>
