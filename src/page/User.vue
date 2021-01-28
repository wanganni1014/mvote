<template>
  <div>
    <van-empty description="您还没有登陆哦~">
        <van-button round type="danger" class="bottom-button" @click="toLogin">去登陆</van-button>
    </van-empty>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import Vue from 'vue'
import { Empty } from 'vant'
Vue.use(Empty)
export default {
  name: 'User',
  components: {Tabbar},
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
