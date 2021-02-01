import request from '@/utils/request'

export function fetchActivityInfo () {
  return request({
    url: '/activity/app/info',
    method: 'get'
  })
}

export function fetchStatics (activityId) {
  return request({
    url: '/activity/app//home/stat?activityId=' + activityId,
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

export function fetchRank (data) {
  return request({
    url: '/activity/app//rank/list',
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
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function fetchMyWorks (userId) {
  return request({
    url: `/activity/app//my/list/${userId}`,
    method: 'get'
  })
}

// 获取报名详情
export function fetchDtail (recordId, userId, activityId) {
  return request({
    url: `/activity/app//my/apply/${recordId}/${userId}/${activityId}`,
    method: 'get'
  })
}
// 获取投票纪录
export function fetchVoteRecord (userId) {
  return request({
    url: `/activity/app//vote/list/${userId}`,
    method: 'get'
  })
}
// 增加阅读次数
export function fetchCommitRead (data) {
  return request({
    url: `activity/app//read/save`,
    method: 'post',
    data
  })
}
