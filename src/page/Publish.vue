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
            v-model="form.userName"
            name="userName"
            label="姓名"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入姓名"
            maxlength="50"
            :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
            v-model="form.userPhone"
            name="userPhone"
            type="tel"
            label="联系方式"
            placeholder="请输入手机号"
            maxlength="11"
            :rules="[
            { required: true, message: '请输入联系方式' }, {pattern:/^1\d{10}$/, message: '请输入正确格式的手机号'}]"
        />
        <van-field
            v-model="form.userAge"
            name="userAge"
            type="tel"
            label="年龄"
            maxlength="3"
            placeholder="请输入年龄"
            :rules="[{ required: true, message: '请输入年龄' }]"
        />
        <!-- <van-field
            name="age"
            label="年龄">
            <template #input>
                <van-slider v-model="form.age">
                    <template #button>
                        <div class="custom-button">{{ form.age }}</div>
                    </template>
                </van-slider>
            </template>
        </van-field> -->
        <van-field
            readonly
            clickable
            name="picker"
            :value="pickerValue"
            label="参赛项目"
            placeholder="请选择参赛项目"
            rows="1"
            autosize
            type="textarea"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择参赛项目' }]"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-cascader
                active-color="#1989fa"
                v-model="pickerValue"
                title="请选择组别"
                :options="options"
                :field-names="fieldNames"
                @close="showPicker = false"
                @finish="onFinish"
              />
                <!-- <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                /> -->
            </van-popup>
        <van-field
            v-model="form.userAddress"
            name="userAddress"
            label="家庭住址"
            placeholder="请输入详细的家庭住址"
            rows="1"
            autosize
            type="textarea"
            :rules="[{ required: true, message: '请输入家庭住址' }]"
        />
        <van-field
            v-model="form.userIdCard"
            name="userIdCard"
            label="身份证号"
            placeholder="请输入您的身份证号码"
            rows="1"
            autosize
            type="textarea"
            :rules="[{ required: true, message: '请输入您的身份证号码' }, {pattern:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message:'请输入正确的身份证号'}]"
        />
        <!-- <van-field name="image" label="视频封面" :rules="[{ required: true, message: '请上传视频封面' }]">
            <template #input>
                <van-uploader v-model="form.image" :max-count="1" :after-read="uploadImage" accept="image/*" />
            </template>
        </van-field> -->
        <van-field name="image" label="身份证照片" :rules="[{ required: true, message: '请上传身份证照片' }]">
            <template #input>
                <van-uploader v-model="form.image" :max-count="1" :after-read="uploadImage" accept="image/*" />
            </template>
        </van-field>
        <van-field name="video" label="参赛视频" :rules="[{ required: true, message: '请上传参赛视频' }]">
            <template #input>
                <van-uploader v-model="form.video" :max-count="1" accept="video/*" :after-read="uploadVideo"/>
            </template>
        </van-field>
        <van-field
            v-model="form.usserIntro"
            name="usserIntro"
            label="参赛宣言"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入您的参赛宣言"
            :rules="[{ required: true, message: '请输入参赛宣言' }]"
        />
        <div style="margin: 50px 16px 40px 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Uploader } from 'vant'
import OSS from 'ali-oss'
import { fetchCategory, fetchApply } from '@/request/index'
Vue.use(Uploader)
export default {
  name: 'Publish',
  data () {
    return {
      form: {
        userPhone: '',
        userName: '',
        userAge: '',
        userAddress: '',
        usserIntro: '',
        userIdCard: '',
        videoUrl: '',
        videoImage: '',
        activityId: localStorage.getItem('activityId'),
        oneCategoryId: '',
        oneCategoryTwo: ''
      },
      videoUploading: false,
      imageUploading: false,
      pickerValue: '',
      fieldNames: {
        text: 'activityCategoryName',
        value: 'activityCategoryId',
        children: 'levelCategoryList'
      },
      options: [],
      showPicker: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit () {
      if (this.imageUploading || this.videoUploading) {
        this.$toast('请等待资源文件上传完成')
        return
      }
      let data = this.form
      let userId = localStorage.getItem('userId')
      data.userId = userId
      delete data.video
      delete data.image
      fetchApply(data).then(res => {
        this.$toast(res.data)
        setTimeout(() => {
          this.$router.replace('/index')
        }, 2000)
      })
    },
    uploadImage (info) {
      this.imageUploading = true
      // this.uploadFile(info, 'videoImage')
    },
    uploadVideo (info) {
      // 获取视频时长
      // var url = URL.createObjectURL(info.file)
      // var audioElement = new Audio(url)
      // audioElement.addEventListener('loadedmetadata', (_event) => {
      //   let audioDuration = parseInt(audioElement.duration)
      //   console.log(audioDuration)
      // })

      // 获取视频大小
      let size = info.file.size
      let MB = (size / 1024 / 1024).toFixed(2)
      if (MB > 150) {
        this.$toast('视频大小不能超过150MB,请重新上传')
        this.form.video = []
        return
      }
      this.videoUploading = true
      // this.uploadFile(info, 'videoUrl')
    },
    async uploadFile (info, key) {
      info.status = 'uploading'
      info.message = '上传中...'
      let forms = new FormData()
      forms.append('file', info.file)
      let fileName = `${new Date().getTime()}_${info.file.name}`
      try {
        await this.client.put(fileName, info.file)
        this.form[key] = 'http://toupiao.sxyundun.com/' + fileName
        console.log(this.form[key])
        info.status = 'done'
        info.message = ''
        if (key === 'videoImage') {
          this.imageUploading = false
        } else {
          this.videoUploading = false
        }
      } catch (e) {
        info.status = 'failed'
        info.message = '上传失败'
        if (key === 'videoImage') {
          this.$toast('身份证照片上传失败,请重试')
          this.form.image = []
          this.imageUploading = false
        } else {
          this.$toast('视频文件上传失败,请重试')
          this.form.video = []
          this.videoUploading = false
        }
        console.log(e)
      }
      // fetchUpload(forms).then(res => {
      //   info.status = 'done'
      //   info.message = ''
      //   let url = res.data
      //   this.form[key] = url
      //   if (key === 'videoImage') {
      //     this.imageUploading = false
      //   } else {
      //     this.videoUploading = false
      //   }
      // }).catch((err) => {
      //   info.status = 'failed'
      //   info.message = '上传失败'
      //   if (key === 'videoImage') {
      //     this.$toast(err.data.msg || '视频封面上传失败,请重试')
      //     this.form.image = []
      //     this.imageUploading = false
      //   } else {
      //     this.$toast(err.data.msg || '视频文件上传失败,请重试')
      //     this.form.video = []
      //     this.videoUploading = false
      //   }
      // })
    },
    getCategory () {
      fetchCategory().then(res => {
        let options = res.data
        // 增加全部栏
        let handleOptions = (list) => {
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
      this.showPicker = false
      this.pickerValue = selectedOptions.map((option) => option.activityCategoryName).join('/')
      let categoryId = selectedOptions.map((option) => option.activityCategoryId)
      this.form.oneCategoryId = categoryId[0] || ''
      this.form.oneCategoryTwo = categoryId[1] || ''
    }
  },
  created () {
    // this.client = new OSS()
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style scope>
.publish-wrap{
    height: 100vh;
    overflow: auto;
}
.form-wrap{
    width: 90%;
    padding: 10px 10px 10px 10px;
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
