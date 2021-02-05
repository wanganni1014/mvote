<template>
  <div class="poster-wapper">
    <img :src="postUrl" alt="" class="poster" @click="goIndex">
  </div>
</template>

<script>
import { fetchActivityInfo } from '@/request/index'
export default {
  name: 'Poster',
  data () {
    return {
      postUrl: ''
    }
  },
  methods: {
    goIndex () {
      this.$router.push('/index')
    }
  },
  mounted () {
    fetchActivityInfo().then(res => {
      this.postUrl = res.data.activityPic
      localStorage.setItem('activityId', res.data.id)
    })
  }
}
</script>

<style>
.poster-wapper{
  font-size: 0;
}
.poster-wapper .poster{
    width: 100vw;
    height: auto;
}
</style>
