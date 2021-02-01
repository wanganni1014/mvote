<template>
<div>
  <van-sticky class="sticky">
        <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
  <div class="page-bg">
    <video
      controls="1"
      autoplay
      :src="detailInfo.videoUrl"
    ></video>
    <div class="detail-title">{{detailInfo.userName}}</div>
    <div class="detail-subtitle">{{detailInfo.usserIntro}}</div>
    <van-grid direction="horizontal" :column-num="2" :border="false">
      <van-grid-item class="statistic-icon" :text="detailInfo.voteNumber ? detailInfo.voteNumber + '票' : '0票'">
        <template #icon>
          <van-icon class="statistic-icon" name="bar-chart-o" size="14"></van-icon>
        </template>
      </van-grid-item>
      <van-grid-item class="statistic-icon" :text="detailInfo.readCount ? detailInfo.readCount + '次观看' : '0次观看'">
        <template #icon>
          <van-icon class="statistic-icon" name="tv-o" size="14"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="record">
      <div class="record-item" v-for="(record, index) in list" :key="index">
        <span>{{record.userName}}给你投票了</span>
        <span>{{record.createDate}}</span>
      </div>
    </div>
    <div class="btn-bg">
      <van-button class="btn-item" icon="comment-o" round color="#619be7" v-if="!isSelf" @click="toVote(detailInfo.id)">投票</van-button>
      <van-button class="btn-item" icon="share-o" round color="#619be7">分享</van-button>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem, Icon, Button } from 'vant'
import { fetchDtail, fetchVoteRecord, fetchVote } from '@/request/index'

Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
Vue.use(Button)

export default {
  name: 'Detail',
  data () {
    return {
      list: [],
      detailInfo: {},
      isSelf: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toVote (id) {
      let obj = {
        activityId: localStorage.getItem('activityId'),
        activityUserId: id,
        voteUserId: localStorage.getItem('userId')
      }
      fetchVote(obj).then(res => {
        this.$toast('投票成功')
      })
    }
  },
  mounted () {
    let {activityId, recordId, userId} = this.$route.query
    this.isSelf = userId === localStorage.getItem('userId')
    fetchDtail(recordId, userId, activityId).then(res => {
      this.detailInfo = res.data
    })
    fetchVoteRecord(recordId).then(res => {
      this.list = res.data.list
    })
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

.statistic-icon {
  padding-right: 3px;
  color: rgb(50, 144, 252);
}

.record {
  width: 100%;
  padding: 10px 4px;
  box-sizing: border-box;
  border-top: solid 1px #dfdfdf;
  margin-bottom: 100px;
  max-height: 140px;
  overflow: auto;
}
.record-item {
  line-height: 32px;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.record-item > span:nth-child(1) {
  flex-grow: 1;
  margin-right: 20px;
}
.record-item > span:nth-child(2) {
  flex-shrink: 0;
}
.btn-bg {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  border-top: solid 1px #dfdfdf;
  padding: 10px 0;
}
.btn-item {
  width: 40vw;
  height: 44px;
  font-size: 16px;
}
</style>
