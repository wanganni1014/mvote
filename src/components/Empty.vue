<template>
  <div>
    <van-empty :description="description" :image="image"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Empty } from 'vant'
Vue.use(Empty)
export default {
  name: 'Empty'
}
</script>
