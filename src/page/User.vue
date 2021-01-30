<template>
  <div>
    <van-empty description="您还没有登陆哦~" v-if="!logined">
        <van-button round type="danger" class="bottom-button" @click="toLogin">去登陆</van-button>
    </van-empty>
    <div v-else>
      <van-row type="flex" align="center" class="info">
        <van-col span="4" offset="1">
          <van-image
            round
            width="80px"
            height="80px"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-col>
        <van-col offset="3">孙燕姿</van-col>
      </van-row>
      <van-cell title="活动规则" is-link url="/rule" />
      <van-cell title="活动简介" is-link url="/reduce" />
      <van-cell title="我的参赛作品" is-link url="/myVideo" />
    </div>
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
  data () {
    return {
      logined: true
    }
  },
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
 .info{
   background-color: white;
   padding: 10px 0;
   margin-bottom: 10px;
 }
</style>
