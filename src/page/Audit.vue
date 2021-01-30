<template>
  <div class="audit-wrap">
    <empty description="暂时还没有作品审核" image="search" v-if="!list || !list.length" />
    <van-list
      class="list-content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="audit-item" v-for="(user, index) in list" :key="index">
        <img
          src="https://weiliicimg9.pstatp.com/weili/l/1060456631215325195.webp"
          alt=""
        />
        <div class="center">
          <div>徐莉佳</div>
          <div>不讲武德</div>
        </div>
        <span class="btn pass-btn" @click.stop="onAuditItemBtnTap">通过</span>
        <span class="btn refuse-btn" @click.stop="onAuditItemBtnTap">拒绝</span>
      </div>
    </van-list>
  </div>
</template>

<script>
import Empty from '@/components/Empty.vue'
export default {
  name: 'Audit',
  components: { Empty },
  data () {
    return {
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
        if (this.list.length >= 100) {
          this.finished = true
        }
      }, 300)
    },

    onAuditItemBtnTap (e) {
      console.log(e)
    }
  }
}
</script>
<style>
.audit-wrap{
  background-color: #f7f7f7;
}
.audit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: white;
  margin-bottom: 10px;
}
.audit-item img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
}
.audit-item .center {
  flex-grow: 1;
  text-align: left;
  margin-left: 8px;
}
.audit-item .center > div:nth-child(2) {
  font-size: 12px;
  color: #999;
}
.audit-item .btn {
  width: 50px;
  line-height: 26px;
  border-radius: 13px;
  margin-left: 5px;
  color: white;
  font-size: 13px;
}
.pass-btn {
  background-color: #43ad3f;
}
.refuse-btn {
  background-color: #ff5300;
}
</style>
