<template>
<div class="detail-warpper">
    <van-sticky class="sticky">
        <van-nav-bar title="官方示例" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="page-bg">
        <video
        controls="1"
        :src="detailInfo.videoUrl"
        :poster="detailInfo.videoUrl + '?x-oss-process=video/snapshot,t_7000,f_jpg,w_640,h_400,m_fast'"
        ></video>
        <div class="detail-title">{{detailInfo.userName}}</div>
        <div class="detail-subtitle">{{detailInfo.usserIntro}}</div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem } from 'vant'

Vue.use(Grid)
Vue.use(GridItem)

export default {
  name: 'Example',
  data () {
    return {
      list: [],
      detailInfo: {
        videoUrl: '',
        userName: '',
        usserIntro: '',
        videoImage: ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  mounted () {
    let {info} = this.$route.query
    this.detailInfo = JSON.parse(info)
  }
}
</script>

<style>
.page-bg {
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  color: #333;
}

.flex-row-center{
  display: flex;
  align-items: center;
}

.ellipsis{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.voteUsername{
  display: inline-block;
  max-width: 100px;
  text-align: left;
}

video {
  width: 100%;
  height: 60vw;
  background-color: black;
}

.detail-title {
  font-size: 18px;
  padding-top: 16px;
}

.detail-subtitle {
  font-size: 16px;
  line-height: 26px;
  color: #666;
  padding-top: 10px;
  text-indent: 2em;
}
</style>
