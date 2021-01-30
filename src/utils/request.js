import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Dts-Admin-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Dts-Admin-Token'] = getToken()
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(response)
    } else {
      if (!response.data) {
        return response
      }
      if (response.data.code !== 200) {
        return Promise.reject(response)
      } else {
        return response.data
      }
    }
  }, error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
