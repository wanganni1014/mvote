import request from '@/utils/request'
// import qs from 'qs'

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

export function fetchLogin (code) {
  return request({
    url: '/activity/app/wxcallback?code=' + code,
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

export function fetchCategory () {
  return request({
    url: '/activity/app/category',
    method: 'get'
  })
}

export function fetchVote (data) {
  return request({
    url: '/activity/app//vote/save',
    method: 'post',
    data
  })
}

export function fetchApply (data) {
  return request({
    url: '/activity/app/apply',
    method: 'post',
    data
  })
}

export function fetchUpload (data) {
  return request({
    url: '/activity/app/file/upload',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data
    // data: qs.stringify(data)
  })
}
