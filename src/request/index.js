import request from '@/utils/request'

export function fetchActivityInfo () {
  return request({
    url: '/activity/app/info',
    method: 'get'
  })
}

export function fetchStatics () {
  return request({
    url: '/activity/app//home/stat',
    method: 'get'
  })
}

export function fetchWxCode () {
  return request({
    url: '/activity/app/wxlogin',
    method: 'get'
  })
}

export function fetchList (data) {
  return request({
    url: '/activity/app//home/list',
    method: 'post',
    data
  })
}
