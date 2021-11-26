import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackPreload: true */ '@/views/index'),
    meta: {
      title: '首页',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '*',
    name: 'LoginPhone',
    // 路由懒加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
    // webpackPreload：https://www.jianshu.com/p/bbdcfeee7fbc
    // component: () => import(/* webpackPreload: true */ '@/views/index'),
    component: () => import(/* webpackPreload: true */ '@/views/auth/loginphone'),
    meta: {
      title: '密码登录',
      showTab: true,
      keepAlive: true
    }
  },
  // 手机验证码登录
  {
    path: '/loginphone',
    name: 'LoginPhone',
    component: () => import('@/views/auth/loginphone'),
    meta: {
      title: '密码登录'
    }
  },
  // 样本库
  {
    path: '/samplelibrary',
    name: 'Samplelibrary',
    component: () => import('@/views/personal/samplelibrary'),
    meta: {
      title: '样本库',
      showTab: false
    }
  },
  // 入库
  {
    path: '/wantdetails',
    name: 'Wantdetails',
    component: () => import('@/views/personal/wantdetails'),
    meta: {
      title: '样本入库',
      showTab: false
    }
  },
  // 入库扫描
  {
    path: '/wantdetailsscan',
    name: 'Wantdetailsscan',
    component: () => import('@/views/personal/wantdetailsscan'),
    meta: {
      title: '样本入库',
      showTab: false
    }
  },
  // 出库
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/personal/checkout'),
    meta: {
      title: '样本出库',
      showTab: false
    }
  },
  // 出库扫描
  {
    path: '/checkoutscan',
    name: 'Checkoutscan',
    component: () => import('@/views/personal/checkoutscan'),
    meta: {
      title: '样本出库',
      showTab: false
    }
  },
  // 报废流程
  {
    path: '/scrapprocess',
    name: 'Scrapprocess',
    component: () => import('@/views/personal/scrapprocess'),
    meta: {
      title: '报废流程',
      showTab: false
    }
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
