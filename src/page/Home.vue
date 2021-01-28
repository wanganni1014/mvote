<template>
  <div>
    <van-swipe :autoplay="3000" class="swiper">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
    <notice-bar />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="content">
        <empty description="暂时还没有参赛作品" image="search"/>
    </van-pull-refresh>
    <tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import NoticeBar from '@/components/NoticeBar.vue'
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Empty } from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {Tabbar, NoticeBar, Empty},
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style>
    .swiper{
        height: 200px;
    }
    .swiper img{
        width: 100%;
        height: auto;
    }
    .content{
        background-color: #fff;
    }
</style>
