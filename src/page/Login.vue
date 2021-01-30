<template>
  <div>
    <van-sticky class="sticky">
        <van-nav-bar
      title="投票大赛"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
      <div class="login-wrap"></div>
      <van-form @submit="onSubmit" validate-trigger="onSubmit">
        <van-field
            v-model="tel"
            name="tel"
            type="tel"
            label="手机号"
            clearable
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
            v-model="code"
            name="code"
            label="验证码"
            type="digit"
            center
            clearable
            placeholder="验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
        <template #button>
            <van-button size="small" type="info" :disabled="text !== '发送验证码'" @click="sendCode" class="code-btn" native-type="button">{{text}}</van-button>
        </template>
        </van-field>
        <div style="margin: 50px 16px 0 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
let count = 60
let timer = null
export default {
  name: 'Login',
  data () {
    return {
      tel: '',
      code: '',
      text: '发送验证码'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    sendCode () {
      timer = setInterval(() => {
        if (count > 0) {
          count--
          this.text = `${count}s后重新发送`
        } else {
          count = 60
          this.text = '发送验证码'
          clearInterval(timer)
        }
      }, 300)
    },
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
<style>
.login-wrap{
    height: 30px;
    background-color: #f7f7f7;
}
.code-btn {
    width: 100px;
}
</style>
