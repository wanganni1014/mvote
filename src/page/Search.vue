<template>
  <div>
    <van-sticky class="sticky">
        <van-search
            v-model="keyword"
            shape="round"
            show-action
            background="#1989Fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            >
             <template #action>
              <div @click="onSearch" style="color: white">搜索</div>
            </template>
            </van-search>
            <van-field
              v-model="fieldValue"
              is-link
              readonly
              placeholder="请选择组别"
              @click="show = true"
            />
            <van-popup v-model="show" round position="bottom">
              <van-cascader
               active-color="#1989fa"
                v-model="pickerValue"
                title="请选择组别"
                :options="options"
                :field-names="fieldNames"
                @close="show = false"
                @change="onChange"
                @finish="onFinish"
              />
            </van-popup>
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
                <div class="custom-grid-item">
                    <img :src="item.videoImage" alt="">
                    <div class="competitor-info">
                        <div>{{item.userName}}</div>
                        <div class="score">{{item.voteNumber}}票</div>
                    </div>
                    <div class="competitor-btn">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" icon="like" round>投票</van-button>
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
    </van-list>
    <tabbar />
  </div>
</template>

<script>
import { fetchList, fetchCategory } from '@/request/index'
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
      currPage: 1,
      list: [],
      loading: false,
      finished: false,
      keyword: '',
      fieldNames: {
        text: 'activityCategoryName',
        value: 'activityCategoryId',
        children: 'levelCategoryList'
      },
      options: [],
      show: false,
      fieldValue: '',
      pickerValue: ''
    }
  },
  methods: {
    onSearch () {
      this.list = []
      this.currPage = 1
      this.getList()
    },
    getList () {
      fetchList({
        page: this.currPage,
        activityId: localStorage.getItem('activityId'),
        userName: this.keyword,
        oneCategoryId: this.oneCategoryId,
        oneCategoryTwo: this.oneCategoryTwo
      }).then(res => {
        let list = res.data.list
        this.list = list.length ? this.list.concat(list) : this.list
        this.loading = false
        if (this.currPage < res.data.totalPage) {
          this.currPage++
        }
        if (this.list.length >= res.data.totalCount) {
          this.finished = true
        }
      })
    },
    onLoad () {
      this.getList()
    },
    getCategory () {
      fetchCategory().then(res => {
        let options = res.data
        // 增加全部栏
        let handleOptions = (list) => {
          list.unshift({
            activityCategoryName: '全部',
            activityCategoryId: '',
            levelCategoryList: null
          })
          list.map(item => {
            if (item.levelCategoryList) {
              if (!item.levelCategoryList.length) {
                item.levelCategoryList = null
              } else {
                handleOptions(item.levelCategoryList)
              }
            }
          })
          return list
        }
        this.options = handleOptions(options)
      })
    },
    toPublish () {
      this.$router.push('/publish')
    },
    onChange () {
      console.log('change 啦')
    },
    onFinish ({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.activityCategoryName).join('/')
      let categoryId = selectedOptions.map((option) => option.activityCategoryId)
      this.oneCategoryId = categoryId[0] || ''
      this.oneCategoryTwo = categoryId[1] || ''
      this.currPage = 1
      this.list = []
      this.getList()
    }
  },
  mounted () {
    this.getCategory()
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
