<template>
  <div class="rank-wrap">
    <van-sticky class="sticky">
      <van-field
      label="筛选分组"
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
                @finish="onFinish"
              />
            </van-popup>
    <!-- <div class="sort-bg">
        <span>一级组：</span>
        <span
          class="sort-item"
          :class="sortIndex == index ? 'sort-item-select' : ''"
          v-for="(sort, index) in sorts"
          :key="'sort' + index"
          @click.stop="onSortItemTap(index)"
          >{{ sort }}</span
        >
      </div>
      <div class="sort-bg">
        <span>二级组：</span>
        <span
          class="sort-item"
          :class="sortIndex == index ? 'sort-item-select' : ''"
          v-for="(sort, index) in sorts2"
          :key="'sort' + index"
          @click.stop="onSortItemTap(index)"
          >{{ sort }}</span
        >
      </div> -->
    </van-sticky>
    <empty description="暂时还没有参赛作品" image="search" v-if="!list.length" />
    <div class="rank-title" v-else>仅显示前100名</div>
    <van-list
      class="list-content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="rank-item" v-for="(user, index) in list" :key="index">
        <div class="rank-item-info">
          <span class="index">{{ index + 1 }}</span>
          <van-image
            round
            width="50"
            height="50"
            :src="user.userHeaderImage"
          />
          <span class="order">{{user.userName}}</span>
        </div>
        <!-- <span class="name">哈哈哈哈</span> -->
        <span class="piao">{{user.voteNumber}}</span>
      </div>
    </van-list>
    <Tabbar />
  </div>
</template>

<script>
import { fetchRank, fetchCategory } from '@/request/index'
import Tabbar from '@/components/Tabbar.vue'
import Empty from '@/components/Empty.vue'
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)

export default {
  name: 'Rank',
  components: { Tabbar, Empty },
  data () {
    return {
      list: [],
      // sortIndex: 0,
      // sorts: ['全部', '广播体操', '武术', '健身操', '仰卧起坐', '太极拳', '跳绳'],
      // sorts2: ['全部', '男子组', '女子组'],
      fieldNames: {
        text: 'activityCategoryName',
        value: 'activityCategoryId',
        children: 'levelCategoryList'
      },
      options: [],
      show: false,
      fieldValue: '',
      pickerValue: '',
      loading: false,
      finished: false
    }
  },

  methods: {
    onLoad () {
      this.getList()
    },

    // onSortItemTap (index) {
    //   if (this.sortIndex !== index) {
    //     this.sortIndex = index
    //   }
    // }
    getList () {
      fetchRank({
        page: 1,
        activityId: localStorage.getItem('activityId'),
        oneCategoryId: this.oneCategoryId,
        oneCategoryTwo: this.oneCategoryTwo
      }).then(res => {
        let list = res.data.list
        this.list = list.length ? this.list.concat(list) : this.list
        this.loading = false
        this.finished = true
      })
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
    onFinish ({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.activityCategoryName).join('/')
      let categoryId = selectedOptions.map((option) => option.activityCategoryId)
      this.oneCategoryId = categoryId[0] || ''
      this.oneCategoryTwo = categoryId[1] || ''
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
.rank-wrap {
  /* background-color: white; */
  height: 100vh;
  overflow: auto;
}
.rank-wrap .van-sticky{
  background-color: #f7f7ff;
  padding-bottom: 10px;
}

.sort-bg {
  width: 100%;
  padding: 10px 14px 0 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.sort-item {
  border: solid 1px #dfdfdf;
  font-size: 14px;
  line-height: 14px;
  padding: 6px 10px;
  text-align: center;
  min-width: 40px;
  background-color: white;
  color: #888;
  border-radius: 3px;
  margin-left: 6px;
  margin-top: 6px;
}

.sort-item-select {
  background-color: rgb(230, 147, 47);
  color: white;
}

.rank-title {
  padding: 15px 0;
  color: #666;
  text-align: center;
  background: white;
}

.list-content {
  padding-bottom: 50px;
}
.rank-item {
  width: 100%;
  background: white;
  text-align: center;
  padding: 15px 14px 15px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border-top: solid 1px #dfdfdf;
}

.rank-item-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.rank-item .index {
  width: 50px;
}
.rank-item .order {
  width: 180px;
  text-align: left;
  margin-left: 10px;
}
.rank-item .name {
  flex-grow: 1;
  text-align: left;
}
.rank-item .piao {
  color: rgb(230, 147, 47);
  font-weight: bold;
  margin-left: 15px;
}
</style>
