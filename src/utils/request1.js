import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

const config = require('./config')
const baseURL = config[process.env.NODE_ENV].baseUrl_new
console.log('baseURL',baseURL)
const CancelToken = axios.CancelToken
const pendingReq = {}

// 创建一个axios实例
const service = axios.create({
  baseURL,
  // withCredentials: true,
  timeout: 50000000,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded', //必须设置,冲掉默认设置的application/json;charset=UTF-8
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "52",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
  },
  
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //     // JWT鉴权
    //     config.headers.Authorization = `Bearer ${getToken()}`
    //     // 取消请求
    //     const key = config.url + '&' + config.method
    //     pendingReq[key] && pendingReq[key]('操作太频繁了~')
    //     config.cancelToken = new CancelToken(c => {
    //       pendingReq[key] = c
    //     })
    //   }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 取消请求
    const key = response.config.url + '&' + response.config.method
    pendingReq[key] && delete pendingReq[key]

    // 与后端约定的错误码
    if (res.ret !== 200) {
      // Toast(res.message)
      // 现约定 50001:无效token 50002:token过期
    //   if (res.code === 50001 || res.code === 50002) {
    //     Dialog.alert({
    //       title: '提示',
    //       message: '您还未登录或登录已过期，请重新登录'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      let code = !!res.data ? res.data.code: null
      if(!!code && code==700) {
        // Toast(msg)
        store.dispatch('user/logout').then(() => {
                  // location.reload()
        })
      }
      console.log(res)
      return res
    }
  },
  error => {
    console.log('err' + error)
    Toast(error.message)
    return Promise.reject(error)
  }
)

export default service
