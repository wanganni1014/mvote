<template>
  <div class="rule">
    <van-sticky class="sticky">
        <van-nav-bar
      title="活动规则"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import { fetchActivityInfo } from '@/request/index'
export default {
  name: 'Introduce',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  mounted () {
    fetchActivityInfo().then(res => {
      this.content = res.data.activityRule.replace(/\n/g, '<br>')
    })
  }
}
</script>
<style scope>
.rule .content {
    background: white;
    padding: 10px;
    margin-top: 10px;
    height: calc(100vh - 60px);
    text-indent: 28px;
}
</style>
