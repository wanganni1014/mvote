<template>
  <div class="notice-wrap">
    <van-notice-bar
        left-icon="volume-o"
        scrollable
        text="全球萌娃大赛来袭,快来参与吧"
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
