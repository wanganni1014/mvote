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
            <van-grid-item v-for="(item, index) in list" :key="index" @click="toDetail">
                <div class="custom-grid-item">
                    <img :src="item.videoImage" alt="参赛封面">
                    <div class="competitor-info">
                        <div>{{item.userName}}</div>
                        <div class="score">{{item.voteNumber}}</div>
                    </div>
                    <div class="competitor-btn" @click.stop="toVote(item.id)">
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
import { Swipe, SwipeItem, Lazyload, Empty, Grid, GridItem, Sticky } from 'vant'
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Sticky)
export default {
  name: 'Home',
  components: {Tabbar, NoticeBar, Empty},
  data () {
    return {
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
        console.log(res.data)
        this.images = res.data.bannerList
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
    toVote (id) {
      let obj = {
        activityId: localStorage.getItem('activityId'),
        activityUserId: id,
        voteUserId: localStorage.getItem('userId')
      }
      fetchVote(obj).then(res => {
        this.$toast('投票成功')
      }).catch(err => {
        this.$toast(err.data.msg)
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
    toPublish () {
      this.$router.push('/publish')
    },
    toDetail () {
      this.$router.push('/detail')
    }
  },
  mounted () {
    this.getActivity()
    this.getStatics()
  }
}
</script>

<style scope>
    .sticky{
        z-index: 9;
        background-color: #f7f7f7;
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
    .swiper img{
        width: 100%;
        height: auto;
    }
    .content{
        background-color: #f7f7f7;
        padding-bottom: 50px;
        margin-top: 12px;
    }
    .custom-grid-item img{
        width: 100%;
        height: 100px;
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
