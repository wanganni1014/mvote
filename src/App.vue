<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { fetchWxCode, fetchLogin } from '@/request/index'
export default {
  name: 'App',
  methods: {
    getCode () {
      let url = window.location.search
      let start = window.location.search.indexOf('=')
      let end = window.location.search.indexOf('&')
      let code = url.substring(start + 1, end)
      return code
    }
  },
  mounted () {
    let code = this.getCode()
    if (code) {
      fetchLogin(code).then(res => {
        let userInfo = JSON.stringify(res.data)
        localStorage.setItem('userInfo', userInfo)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('accessToken', res.data.accessToken)
      })
    } else {
      fetchWxCode().then(res => {
        let redirectUri = res.split('redirect:')[1]
        this.$nextTick(() => {
          window.location.href = redirectUri
        })
      })
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #f7f7f7;
  height: 100vh;
}
</style>
