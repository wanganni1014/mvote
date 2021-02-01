<template>
  <div>
    <van-sticky class="sticky">
        <van-nav-bar
      title="我的作品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
    <div class="my-works">

    </div>
  </div>
</template>

<script>
import { fetchMyWorks } from '@/request/index'
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
    let userId = localStorage.getItem('userId')
    fetchMyWorks(userId).then(res => {
      this.content = res.data.activityIntro
    })
  }
}
</script>
<style scope>
.content {
    background: white;
    padding: 10px;
    margin-top: 10px;
    height: calc(100vh - 60px);
    text-indent: 28px;
}
</style>
