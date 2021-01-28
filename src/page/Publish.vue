<template>
  <div class="publish-wrap">
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
            <van-popup v-model="showPicker" position="bottom">
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
      columns: ['项目一', '项目二', '项目三', '项目四', '项目五'],
      showPicker: false
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    onConfirm (value) {
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
