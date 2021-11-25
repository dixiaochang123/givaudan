import { login, getInfo } from '@/api/user'
import { Login,CodeLoginRong,ResetPassword,Login1 } from '@/api/login'
import Cookies from 'js-cookie'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  uid: '',
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo'))  : {}
  // userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
    state.uid = !!info.id ? info.id : ""
  }
}

const actions = {
  // 登录
  login({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      Login(loginInfo)
        .then(res => {
          if(res.data.code==0) {

            const { token } = res.data.info[0];
            console.log(res.data.info[0])
            commit('SET_TOKEN', token)
            commit('SET_USER_INFO', res.data.info[0])
            setToken(token)
            Cookies.set('userInfo', res.data.info[0], { expires: 15 })
            resolve()
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 验证码登录
  logincode({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      Login1(loginInfo)
        .then(res => {
          console.log(res)
          if(res.code==0) {

            // const { token } = res.data.info;
            console.log(res.data.info)
            // commit('SET_TOKEN', token)
            commit('SET_USER_INFO', res.data.userMap)
            // setToken(token)
            Cookies.set('userInfo', res.data.userMap, { expires: 15 })
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 重置密码登录
  forget({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      ResetPassword(loginInfo)
        .then(res => {
          console.log(res)
          if(res.data.code==0) {

            const { token } = res.data.info;
            console.log(res.data.info)
            commit('SET_TOKEN', token)
            commit('SET_USER_INFO', res.data.info)
            setToken(token)
            Cookies.set('userInfo', res.data.info, { expires: 15 })
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log('退出')
      // commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {})
      // removeToken()
      Cookies.remove('userInfo', { path: '' })
      // setTimeout(()=>{
      //   window.location = "#/login"
      // },1000)
      resolve()
    })
  },

  // 获取基本用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(res => {
          const data = res.entry
          if (!data) {
            reject(new Error('获取基本信息失败，请重新登录'))
          }
          commit('SET_USER_INFO', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  setuserinfo({ commit },data) {
    commit('SET_USER_INFO', data)
    // setToken(token)
    Cookies.set('userInfo', data, { expires: 15 })
  },

  // 重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
