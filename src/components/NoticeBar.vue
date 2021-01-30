<template>
  <div class="notice-wrap">
    <van-notice-bar
        left-icon="volume-o"
        scrollable
        text='2021年新疆第一季云健身“运动汇”火热报名中'
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { NoticeBar } from 'vant'
Vue.use(NoticeBar)
export default {
  name: 'NoticeBar'
}
</script>
