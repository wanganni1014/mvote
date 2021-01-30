<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import { fetchWxCode } from '@/request/index'
export default {
  name: 'App',
  methods: {
    getUrl () {
      // let appID = 'wxb5e37c49945d6ea3'
      // let redirectUri = encodeURIComponent('http://localhost:8080/#/')
      // let strUrl =
      //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      //   appID +
      //   '&redirect_uri=' +
      //   redirectUri +
      //   '%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      // this.$nextTick(() => {
      //   window.location.href = strUrl
      // })
    },
    getCode () {
      // let url = window.location.search
      // let start = window.location.search.indexOf('=')
      // let end = window.location.search.indexOf('&')
      // let code = url.substring(start + 1, end)
      // return code

    }
  },
  mounted () {
    // fetchWxCode().then(res => {
    //   let redirectUri = res.split('redirect:')[1]
    //   this.$nextTick(() => {
    //     window.location.href = redirectUri
    //   })
    // })
    // let code = this.getCode()
    // console.log(code)
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
