<template>
  <div id="app">
    <van-nav-bar
      title="投票大赛"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    onClickLeft () {
      this.$router.goBack()
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
  text-align: center;
  background-color: #f7f7f7;
  height: 100vh;
}
</style>
