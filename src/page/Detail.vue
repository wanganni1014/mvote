<template>
<div class="detail-warpper">
  <van-sticky class="sticky">
        <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <van-icon name="home-o" size="18" />
          </template>
        </van-nav-bar>
    </van-sticky>
  <div class="page-bg">
    <video
      controls="1"
      :src="detailInfo.videoUrl"
      :poster="detailInfo.videoUrl + '?x-oss-process=video/snapshot,t_7000,f_jpg,w_640,h_400,m_fast'"
    ></video>
    <div class="detail-title">{{detailInfo.userName}}</div>
    <div class="userId">编号 {{detailInfo.id}}</div>
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
        <span v-if="record" class="flex-row-center"><span class="ellipsis voteUsername">{{record.userName}}</span><span>给你投票了</span></span>
        <span v-if="record">{{record.createDate}}</span>
      </div>
    </div>
    <div class="btn-bg">
      <van-button class="btn-item" icon="comment-o" round color="#619be7" v-if="!isSelf" @click="toVote(detailInfo.id)">投票</van-button>
      <van-button class="btn-item" icon="share-o" round color="#619be7" @click="toGuideShare">分享</van-button>
    </div>
  </div>
  <van-popup v-model="guideShow" :get-container="getContainer">
    <div class="guide">
      <img src="@/assets/guide.png" class="one">
      <img src="@/assets/ok.png" class="ok" @click="guideShow = false">
    </div>
  </van-popup>
</div>
</template>

<script>
import Vue from 'vue'
import sha1 from 'sha1'
import { Grid, GridItem, Icon, Popup } from 'vant'
import { fetchDtail, fetchVoteRecord, fetchVote, fetchCommitRead, fetchTicket } from '@/request/index'

Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
Vue.use(Popup)

export default {
  name: 'Detail',
  data () {
    return {
      list: [],
      detailInfo: {
        videoUrl: '',
        userName: '',
        usserIntro: '',
        voteNumber: '',
        readCount: '',
        id: '',
        videoImage: ''
      },
      guideShow: false,
      isSelf: false
    }
  },
  methods: {
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer () {
      return document.querySelector('.detail-warpper')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.replace('/index')
    },
    toVote (id) {
      let obj = {
        activityId: localStorage.getItem('activityId'),
        activityUserId: id,
        voteUserId: localStorage.getItem('userId')
      }
      fetchVote(obj).then(() => {
        this.$toast('投票成功')
        this.detailInfo.voteNumber++
      })
    },
    createNoncestr () {
      let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let targetStr = ''
      for (let i = 0; i < 32; i++) {
        targetStr += `${str[Math.floor(Math.random() * 32)]}`
      }
      return targetStr
    },
    createSignature (obj) {
      let tempStr = ''
      let keys = Object.keys(obj)
      keys.sort()
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          tempStr += `${keys[i]}=${obj[keys[i]]}`
        } else {
          tempStr += `${keys[i]}=${obj[keys[i]]}&`
        }
      }
      let signature = sha1(tempStr)
      return signature
    },
    toGuideShare () {
      // this.$toast('请点击右上角"..."选择分享')
      this.guideShow = true
    },
    getShareAuth () {
      let that = this
      fetchTicket(window.location.href).then(res => {
        let {appId, nonceStr, timestamp, signature} = res.data
        let configObj = {
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        }
        let params = window.location.href.split('/detail')[1]
        let shareUrl = `${window.location.origin}/#/detail${params}`
        window.weixin.config(configObj)
        window.weixin.ready(() => {
          window.weixin.updateAppMessageShareData({
            title: `我是${that.detailInfo.userName}，我正在参加2021年新疆第一季云健身“运动汇”线上评选活动`, // 分享标题
            desc: '大手牵小手,健身一起走，动动您发财的小手，快来助我一臂之力吧', // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.detailInfo.videoImage // 分享图标
          })
          window.weixin.updateTimelineShareData({
            title: `我是${that.detailInfo.userName}，我正在参加2021年新疆第一季云健身“运动汇”线上评选活动`, // 分享标题
            desc: '大手牵小手,健身一起走，动动您发财的小手，快来助我一臂之力吧', // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.detailInfo.videoImage // 分享图标
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    let {activityId, recordId} = this.$route.query
    let currUserId = localStorage.getItem('userId')
    fetchCommitRead({activityId, activityUserId: recordId, voteUserId: currUserId})
  },
  mounted () {
    let {activityId, recordId, userId} = this.$route.query
    let currUserId = localStorage.getItem('userId')
    this.isSelf = userId === currUserId
    fetchDtail(recordId, userId, activityId).then(res => {
      this.detailInfo = res.data
    })
    fetchVoteRecord(recordId).then(res => {
      this.list = res.data.list
    })
    this.getShareAuth()
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
.userId{
  font-size: 14px;
  color: #666;
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
.detail-warpper .van-popup {
  background: transparent;
}
.guide {
  text-align: center;
}
.guide .one{
  width: 100vw;
}
.guide .ok{
  width: 60vw;
  margin-bottom: 30px;
}
</style>
