<template>
  <div>
    <van-sticky class="sticky">
        <van-search
            v-model="value"
            shape="round"
            background="#1989Fa"
            placeholder="请输入搜索关键词"
            />
    </van-sticky>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="content"
        >
        <empty description="暂时还没有参赛作品" image="search" v-if="!list.length"/>
        <!-- <van-cell v-else v-for="item in list" :key="item" :title="item" /> -->
        <van-grid :gutter="10" :border="false" :column-num="2">
            <van-grid-item v-for="(item, index) in list" :key="index" @click="toPublish">
                <!-- <video src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video> -->
                <div class="custom-grid-item">
                    <img src="https://weiliicimg9.pstatp.com/weili/l/1060456631215325195.webp" alt="">
                    <div class="competitor-info">
                        <div>徐佳丽</div>
                        <div class="score">99票</div>
                    </div>
                    <div class="competitor-btn">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" icon="like" round>投票</van-button>
                        <!-- <van-button disabled color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" icon="good-job" round>已投</van-button> -->
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
    </van-list>
    <tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import NoticeBar from '@/components/NoticeBar.vue'
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Empty, Grid, GridItem, Sticky } from 'vant'
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Sticky)
export default {
  name: 'Home',
  components: {Tabbar, NoticeBar, Empty},
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        this.$toast('刷新成功')
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    toPublish () {
      this.$router.push('/publish')
    }
  }
}
</script>

<style scope>
    .sticky{
        z-index: 9;
        background-color: #f7f7f7;
    }
    .swiper{
        height: 200px;
    }
    .swiper img{
        width: 100%;
        height: auto;
    }
    .content{
        background-color: #f7f7f7;
        padding-bottom: 50px;
        margin-top: 12px;
    }
    .custom-grid-item{
        width: 140px;
    }
    .custom-grid-item img{
        width: 100%;
        height: auto;
    }
    .competitor-info{
        display: flex;
        justify-content: space-between;
    }
    .competitor-btn{
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
    }
    .competitor-info .score{
        color: red;
    }
</style>
