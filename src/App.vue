<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { fetchLogin } from '@/request/index'
export default {
  name: 'App',
  methods: {
    getCode () {
      let url = window.location.search
      let start = window.location.search.indexOf('=')
      let end = window.location.search.indexOf('&')
      let code = url.substring(start + 1, end)
      return code
    },
    getUrl () {
      let appID = 'wxb5e37c49945d6ea3'
      let url = window.location.href
      let redirectUri = encodeURIComponent(url.replace('http://192.168.20.52:9999', 'http://toupiao-api.jinbangshichuang.com'))
      let strUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appID + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      this.$nextTick(() => {
        window.location.href = strUrl
      })
    }
  },
  mounted () {
    let code = this.getCode() || '031qR10w3GrrMV2qdu2w3bE3rT2qR10q'
    if (code) {
      fetchLogin(code).then(res => {
        let userInfo = JSON.stringify(res.data)
        localStorage.setItem('userInfo', userInfo)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('accessToken', res.data.accessToken)
      })
    } else {
      this.getUrl()
      // fetchWxCode().then(res => {
      //   let redirectUri = res.split('redirect:')[1]
      //   this.$nextTick(() => {
      //     window.location.href = redirectUri
      //   })
      // })
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
.van-grid-item__content{
  padding: 8px !important;
}
</style>
