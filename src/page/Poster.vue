<template>
  <img :src="postUrl" alt="" class="poster" @click="goIndex">
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
.poster{
    width: 100%;
    height: auto;
}
</style>
