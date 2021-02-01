<template>
  <div>
    <van-sticky class="sticky">
        <van-nav-bar
      title="我的作品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
    <div class="my-works" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
        <van-cell-group>
            <van-cell :title="item.createTime">
                <template #right-icon>
                   <van-tag :type="item.applyStatues === 0 ? 'primary' : item.applyStatues === 1 ? 'success' : 'danger'">{{item.applyStatuesStr}}</van-tag>
                </template>
            </van-cell>
            <van-cell title="">
                <template #label>
                    <div class="span-div">
                        <span class="label">活动: </span>
                        <span class="value">{{item.activityName}}</span>
                    </div>
                    <div class="span-div">
                        <span class="label">参赛类目: </span>
                        <span class="value">{{item.oneCategoryName}}{{item.twoCategoryName ? ' / ' + item.twoCategoryName : ''}}</span>
                    </div>
                    <div class="span-div" v-if="item.applyRemark">
                        <span class="label">审核备注: </span>
                        <span class="value">{{item.applyRemark}}</span>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
  </div>
</template>

<script>
import { fetchMyWorks } from '@/request/index'
export default {
  name: 'MyVideo',
  data () {
    return {
      list: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toDetail (item) {
      let userId = localStorage.getItem('userId')
      if (item.applyStatues === 1) {
        this.$router.push({path: '/detail', query: { activityId: item.activityId, recordId: item.id, userId: userId }})
      }
    }
  },
  mounted () {
    let userId = localStorage.getItem('userId') || 761
    fetchMyWorks(userId).then(res => {
      this.list = res.data
    })
  }
}
</script>
<style scope>
.my-works {
    margin: 10px;
}
.my-works .span-div{
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
}
.my-works .label {
    margin-right: 10px;
}
</style>
