<template>
  <div>
    <van-sticky class="sticky">
        <van-swipe :autoplay="3000" class="swiper">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" @click="toPublish"/>
            </van-swipe-item>
        </van-swipe>
    <notice-bar :msg="activityRemark"/>
    </van-sticky>
    <!-- <van-row type="flex" justify="space-around" class="data-panel">
      <van-col span="6" type="flex" justify="center">
        <van-row class="up">6</van-row>
        <van-row class="down">报名人数</van-row>
      </van-col>
      <van-col span="6" type="flex" justify="center">
        <van-row class="up">338</van-row>
        <van-row class="down">累计票数</van-row>
      </van-col>
      <van-col span="6" type="flex" justify="center">
        <van-row class="up">6681</van-row>
        <van-row class="down">访问人数</van-row>
      </van-col>
    </van-row> -->
    <van-row type="flex" justify="center" align="center" class="time-panel">
      <van-col type="flex" align="center">
        <van-row>
          <span class="time-label">活动倒计时: </span>
          <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
        </van-row>
        <van-row>
          <span class="time-label">活动时间: {{startTime}} - {{endTime}}</span>
        </van-row>
    </van-col>
    </van-row>
    <van-row class="data-panel">
      <van-col span="8" type="flex" justify="center" align="center">
        <van-row>{{userNumber || 0}}</van-row>
        <van-row>报名人数</van-row>
      </van-col>
      <van-col span="8" type="flex" justify="center" align="center">
        <van-row>{{voteNumber || 0}}</van-row>
        <van-row>累计票数</van-row>
      </van-col>
      <van-col span="8" type="flex" justify="center" align="center">
        <van-row>{{readNumber || 0}}</van-row>
        <van-row>访问人数</van-row>
      </van-col>
    </van-row>

    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="content"
        >
        <empty description="暂时还没有参赛作品" image="search" v-if="!list.length"/>
        <van-grid :gutter="10" :border="false" :column-num="2">
            <van-grid-item v-for="(item, index) in list" :key="index" @click="toDetail(item)">
                <div class="custom-grid-item">
                    <van-image
                      width="100%"
                      height="100"
                      fit="contain"
                      :src="item.videoImage"
                    />
                    <div class="competitor-info">
                        <div>{{item.userName}}</div>
                        <div class="score">{{item.voteNumber}}</div>
                    </div>
                    <div class="competitor-btn" @click.stop="toVote(item, index)">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" icon="like" round>投票</van-button>
                        <!-- <van-button disabled color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" icon="good-job" round>已投</van-button> -->
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
    </van-list>
    <tabbar />
  </div>
</template>

<script>
import { fetchActivityInfo, fetchStatics, fetchList, fetchVote } from '@/request/index'
import Tabbar from '@/components/Tabbar.vue'
import NoticeBar from '@/components/NoticeBar.vue'
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Empty, Grid, GridItem, Sticky, Image as VanImage } from 'vant'
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Sticky)
Vue.use(VanImage)
export default {
  name: 'Home',
  components: {Tabbar, NoticeBar, Empty},
  data () {
    return {
      time: 30 * 60 * 60 * 1000,
      startTime: '',
      endTime: '',
      readNumber: 0,
      userNumber: 0,
      voteNumber: 0,
      activityRemark: '',
      images: [],
      list: [],
      loading: false,
      finished: false,
      currPage: 1
    }
  },
  methods: {
    getActivity () {
      fetchActivityInfo().then(res => {
        this.startTime = res.data.startTime
        this.endTime = res.data.endTime
        this.images = res.data.bannerList
        let curr = new Date().getTime()
        let end = new Date(res.data.endTime).getTime()
        this.time = end - curr
        this.activityRemark = res.data.activityRemark
      })
    },
    getStatics () {
      fetchStatics(localStorage.getItem('activityId')).then(res => {
        this.readNumber = res.data.readNumber
        this.userNumber = res.data.userNumber
        this.voteNumber = res.data.voteNumber
      })
    },
    toVote (item, index) {
      let obj = {
        activityId: localStorage.getItem('activityId'),
        activityUserId: item.id,
        voteUserId: localStorage.getItem('userId')
      }
      fetchVote(obj).then(res => {
        this.$toast('投票成功')
        this.list[index].voteNumber++
      })
    },
    onLoad () {
      fetchList({
        page: this.currPage,
        activityId: localStorage.getItem('activityId')
      }).then(res => {
        let list = res.data.list
        this.list = list.length ? this.list.concat(list) : this.list
        this.loading = false
        if (this.currPage < res.data.totalPage) {
          this.currPage++
        }
        if (this.list.length >= res.data.totalCount) {
          this.finished = true
        }
      })
    },
    toPublish (item) {
      this.$router.push('/publish')
    },
    toDetail (item) {
      this.$router.push({path: '/detail', query: { activityId: item.activityId, recordId: item.id, userId: item.userId }})
    }
  },
  mounted () {
    this.getActivity()
    this.getStatics()
  }
}
</script>

<style scope>
    .time-panel{
      padding: 10px 0;
      background-color: white;
    }
    .sticky{
        z-index: 9;
        background-color: #f7f7f7;
        margin-bottom: 10px;
    }
    .van-count-down{
      display: inline-block;
    }
    .time-label{
      font-size: 14px;
      color: #333;
    }
    .data-panel{
      margin-top: 10px;
      margin: 10px auto 0 10px;
      width: 96%;
      background-image: linear-gradient(to bottom right, #619be7 , #663cca);
      padding: 10px;
      border-radius: 6px;
      color: white;
    }
    .up{
      padding: 3px 0;
      background-color: #518379;
      color: white;
    }
    .down{
      padding: 3px 0;
      color: white;
      background-color: #0b2720;
    }
    .swiper{
        height: 200px;
    }
    .custom-grid-item {
      width: 100%
    }
    .swiper img{
        width: 100%;
        height: auto;
    }
    .content{
        background-color: #f7f7f7;
        padding-bottom: 50px;
        margin-top: 12px;
    }
    .competitor-info{
        display: flex;
        justify-content: space-between;
    }
    .competitor-btn{
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
    }
    .competitor-info .score{
        color: red;
    }
</style>
