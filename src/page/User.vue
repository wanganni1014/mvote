<template>
  <div>
    <div v-if="logined">
      <van-row type="flex" align="center" class="info">
        <van-col span="4" offset="1">
          <van-image
            round
            width="80px"
            height="80px"
            fit="cover"
            :src="userInfo.headImageUrl"
          />
        </van-col>
        <van-col offset="3">{{userInfo.nikeName}}</van-col>
      </van-row>
      <van-cell title="活动规则" is-link to="rule" />
      <van-cell title="活动介绍" is-link to="introduce" />
      <van-cell title="我的参赛作品" is-link to="myVideo" />
    </div>
    <van-empty description="您还没有登陆哦~" v-else>
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
  data () {
    return {
      logined: true,
      userInfo: {}
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  },
  mounted () {
    let _userInfo = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(_userInfo)
    if (userInfo.userId) {
      this.logined = true
      this.userInfo = userInfo
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
