<template>
  <div>
    <van-tabbar route>
        <van-tabbar-item replace to="/index"  icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search"  icon="search">搜索</van-tabbar-item>
        <van-tabbar-item to="/publish">
          <template>
            <div class="test">报名</div>
            <!-- <van-icon :name="props.active ? 'like' : 'bell'" size="40" color="red"/> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/rank"  icon="bar-chart-o">排名</van-tabbar-item>
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
<style>
  .test{
    box-sizing: border-box;
    position: relative;
    top: -0.8rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    color: white;
    text-align: center;
    line-height: 3.6rem;
    font-size: 1.0rem;
    font-weight: 500;
    background: linear-gradient(45deg, rgb(39, 39, 214), rgb(245, 73, 245));
    z-index: 9;
    border: 3px solid white
  }
</style>
