<template>
  <div>
    <div class="sort-bg">
      <span
        class="sort-item"
        :class="sortIndex == index ? 'sort-item-select' : ''"
        v-for="(sort, index) in sorts"
        :key="'sort' + index"
        @click.stop="onSortItemTap(index)"
        >{{ sort }}</span
      >
    </div>
    <empty description="暂时还没有参赛作品" image="search" v-if="!list.length" />
    <div class="rank-title" v-else>仅显示前100名</div>
    <van-list
      class="list-content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="rank-item" v-for="(user, index) in list" :key="'rank' + index">
        <span class="index">{{ index + 1 }}</span>
        <img
          class="avatar"
          src="https://weiliicimg9.pstatp.com/weili/l/1060456631215325195.webp"
          alt=""
        />
        <span class="order">123</span>
        <span class="name">哈哈哈哈</span>
        <span class="piao">123123</span>
      </div>
    </van-list>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Vue from "vue";
import { Cell, CellGroup } from "vant";

Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: "Rank",
  components: { Tabbar },
  data() {
    return {
      list: [],
      sortIndex: 0,
      sorts: ["全部", "广播体操", "武术", "健身操", "仰卧起坐", "太极拳", "跳绳"],
      loading: false,
      finished: false,
    };
  },

  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },

    onSortItemTap(index) {
      if (this.sortIndex != index) {
        this.sortIndex = index;
      }
    },
  },
};
</script>

<style>
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
}

.list-content {
  padding-bottom: 50px;
}
.rank-item {
  width: 100%;
  padding: 18px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border-top: solid 1px #dfdfdf;
}
.rank-item .index {
  width: 50px;
}
.rank-item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 1px #dedede;
}
.rank-item .order {
  width: 80px;
  text-align: center;
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
