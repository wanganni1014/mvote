<template>
  <div class="notice-wrap">
    <van-notice-bar
        left-icon="volume-o"
        scrollable
        :text="msg"
        color="#1989fa" background="#ecf9ff"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { NoticeBar } from 'vant'
Vue.use(NoticeBar)
export default {
  name: 'NoticeBar',
  props: ['msg']
}
</script>
