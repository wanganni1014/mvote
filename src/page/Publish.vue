<template>
  <div class="publish-wrap">
    <van-sticky class="sticky">
        <van-nav-bar
      title="报名参赛"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
    <div class="form-wrap">
         <van-form @submit="onSubmit" validate-trigger="onSubmit">
        <van-field
            v-model="form.name"
            name="name"
            label="姓名"
            clearable
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
            v-model="form.tel"
            name="tel"
            type="tel"
            label="联系方式"
            clearable
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入联系方式' }]"
        />
        <van-field
            name="age"
            label="年龄">
            <template #input>
                <van-slider v-model="form.age">
                    <template #button>
                        <div class="custom-button">{{ form.age }}</div>
                    </template>
                </van-slider>
            </template>
        </van-field>
        <van-field
            readonly
            clickable
            name="picker"
            :value="form.item"
            label="参赛项目"
            placeholder="请选择参赛项目"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择参赛项目' }]"
            />
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                />
            </van-popup>
        <van-field
            v-model="form.address"
            name="address"
            label="家庭住址"
            clearable
            placeholder="请输入详细的家庭住址"
            :rules="[{ required: true, message: '请输入家庭住址' }]"
        />
        <van-field name="idCard" label="身份证" :rules="[{ required: true, message: '请上传身份证照片' }]">
            <template #input>
                <van-uploader v-model="form.idCard" />
            </template>
        </van-field>
        <van-field name="video" label="参赛视频" :rules="[{ required: true, message: '请上传参赛视频' }]">
            <template #input>
                <van-uploader v-model="form.video" />
            </template>
        </van-field>
        <div style="margin: 50px 16px 0 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Uploader } from 'vant'
Vue.use(Uploader)
export default {
  name: 'Publish',
  data () {
    return {
      form: {
        tel: '',
        code: '',
        age: 25,
        item: '',
        address: '',
        idCard: [],
        video: []
      },
      columns: [
        {
          text: '第九套广播体操',
          children: []
        },
        {
          text: '深蹲起',
          children: [
            {
              text: '成人组'
            },
            {
              text: '青少年组'
            }
          ]
        },
        {
          text: '跳绳',
          children: [
            {
              text: '青少年组（男子）'
            },
            {
              text: '成人组（男子）'
            },
            {
              text: '青少年组（女子）'
            },
            {
              text: '成人组（女子）'
            }
          ]
        }
      ],
      showPicker: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit (values) {
      console.log('submit', values)
    },
    onConfirm (value) {
      console.log(value)
      this.value = value
      this.showPicker = false
    }
  }
}
</script>
<style scope>
.publish-wrap{
    height: 100vh;
    background: linear-gradient(45deg, palegoldenrod, pink, plum);
    animation: hueRotate 10s infinite alternate;
}
@keyframes hueRotate {
    100% {
        /* hue-rotate(deg): 给图像应用色相旋转,deg设定图像会被调整的色环角度值 */
        filter: hue-rotate(360deg);
    }
}
.form-wrap{
    width: 90%;
    padding: 50px 10px 10px 10px;
    margin: 0 auto;
}
.custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #007ef4;
    border-radius: 100px;
  }
</style>
