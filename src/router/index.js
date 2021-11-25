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
  // 密码登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/loginphone'),
    meta: {
      title: '登录'
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
  // 注册
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/views/auth/regist'),
    meta: {
      title: '注册'
    }
  },
  // 找回密码
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/auth/forget'),
    meta: {
      title: '找回密码'
    }
  },
  // 入库
  {
    path: '/warehousing',
    name: 'Warehousing',
    component: () => import('@/views/personal/warehousing'),
    meta: {
      title: '样本入库',
      showTab: true,
      keepAlive: true
    }
  },
  // 分类
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category'),
    meta: {
      title: '分类',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/match',
    name: 'Match',
    component: () => import('@/views/match'),
    children:[
      {
        path: '/match',
        name: 'All',
        component: () => import('@/views/match/all'),
        meta: {
          title: '全部',
          showTab: true,
          keepAlive: true
        }
      },
      {
        path: '/football',
        name: 'Football',
        component: () => import('@/views/match/football'),
        meta: {
          title: '足球',
          showTab: true,
          keepAlive: true
        }
      },
      {
        path: '/basketball',
        name: 'Basketball',
        component: () => import('@/views/match/basketball'),
        meta: {
          title: '篮球',
          showTab: true,
          keepAlive: true
        }
      },
      {
        path: '/other',
        name: 'Other',
        component: () => import('@/views/match/other'),
        meta: {
          title: '其他',
          showTab: true,
          keepAlive: true
        }
      },
      {
        path: '/before',
        name: 'Before',
        component: () => import('@/views/match/before'),
        meta: {
          title: '预约',
          showTab: true,
          keepAlive: true
        }
      },
      {
        path: '/matchdetails',
        name: 'Matchdetails',
        component: () => import('@/views/match/matchdetails'),
        meta: {
          title: '赛事详情',
          showTab: false,
          keepAlive: true
        }
      },
    ],
    meta: {
      title: '赛事',
      showTab: true,
      keepAlive: true
    }
  },
  // 关注
  {
    path: '/like',
    name: 'Like',
    component: () => import('@/views/like'),
    meta: {
      title: '关注',
      showTab: true
    }
  },
  // 商场
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/shop'),
    meta: {
      title: '商场',
      showTab: true
    }
  },
  // 商品详情
  {
    path: '/shopdetails',
    name: 'Shopdetails',
    component: () => import('@/views/shop/shopdetails'),
    meta: {
      title: '商品详情',
      showTab: false
    }
  },
  // 身份认证
  {
    path: '/orderinfo',
    name: 'Orderinfo',
    component: () => import('@/views/shop/orderinfo'),
    meta: {
      title: '身份认证',
      showTab: false
    }
  },
  // 确认订单
  {
    path: '/confirmorder',
    name: 'Confirmorder',
    component: () => import('@/views/shop/confirmorder'),
    meta: {
      title: '确认订单',
      showTab: false
    }
  },
  // 订单
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/shop/order'),
    meta: {
      title: '订单',
      showTab: false
    }
  },
  // 订单状态
  {
    path: '/orderstate',
    name: 'Orderstate',
    component: () => import('@/views/shop/orderstate'),
    meta: {
      title: '订单状态',
      showTab: false
    }
  },
  // 个人中心
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/personal'),
    meta: {
      title: '个人中心',
      showTab: false
    }
  },
  // 个人信息
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: () => import('@/views/personal/userinfo'),
    meta: {
      title: '个人信息',
      showTab: false
    }
  },
  //我的诉求
  {
    path: '/myappeal',
    name: 'Myappeal',
    component: () => import('@/views/personal/myappeal'),
    meta: {
      title: '我的诉求',
      showTab: false
    }
  },
  //企业诉求
  {
    path: '/enterpriseappeal',
    name: 'Enterpriseappeal',
    component: () => import('@/views/personal/enterpriseappeal'),
    meta: {
      title: '企业诉求',
      showTab: false
    }
  },
  //诉求详情 Appeal details
  {
    path: '/appealdetails',
    name: 'Appealdetails',
    component: () => import('@/views/personal/appealdetails'),
    meta: {
      title: '诉求详情',
      showTab: false
    }
  },
  //政策解读 Policy  interpretation
  {
    path: '/policyint',
    name: 'Policyint',
    component: () => import('@/views/personal/policyint'),
    meta: {
      title: '诉求详情',
      showTab: false
    }
  },
  //政策解读item Policy  interpretation
  {
    path: '/policyintitem',
    name: 'Policyintitem',
    component: () => import('@/views/personal/policyintitem'),
    meta: {
      title: '诉求详情',
      showTab: false
    }
  },
  //猜你想问
  {
    path: '/want',
    name: 'Want',
    component: () => import('@/views/personal/want'),
    meta: {
      title: '猜你想问',
      showTab: false
    }
  },
  //问答详情
  {
    path: '/wantdetails',
    name: 'Wantdetails',
    component: () => import('@/views/personal/wantdetails'),
    meta: {
      title: '问答详情',
      showTab: false
    }
  },
  // 系统消息
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/personal/message'),
    meta: {
      title: '系统消息',
      showTab: false
    }
  },
  // 交流园地
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('@/views/personal/communication'),
    meta: {
      title: '交流园地',
      showTab: false
    }
  },
  // 查看帖子 View Post
  {
    path: '/viewpost',
    name: 'Viewpost',
    component: () => import('@/views/personal/viewpost'),
    meta: {
      title: '查看帖子',
      showTab: false
    }
  },
  // 查看帖子 交流园地
  {
    path: '/viewpost1',
    name: 'Viewpost1',
    component: () => import('@/views/personal/viewpost1'),
    meta: {
      title: '查看帖子',
      showTab: false
    }
  },
  // 发布帖子 release
  {
    path: '/releasepost',
    name: 'Releasepost',
    component: () => import('@/views/personal/releasepost'),
    meta: {
      title: '发布帖子',
      showTab: false
    }
  },
  // 我的帖子
  {
    path: '/mypost',
    name: 'Mypost',
    component: () => import('@/views/personal/mypost'),
    meta: {
      title: '我的帖子',
      showTab: false
    }
  },
  // 企业查询 Enterprise 
  {
    path: '/enterprisequery',
    name: 'Enterprisequery',
    component: () => import('@/views/personal/enterprisequery'),
    meta: {
      title: '企业查询',
      showTab: false
    }
  },
  // 企业信息 Enterprise 
  {
    path: '/enterpriseinfo',
    name: 'Enterpriseinfo',
    component: () => import('@/views/personal/enterpriseinfo'),
    meta: {
      title: '企业信息',
      showTab: false
    }
  },
  // 企业网络信息 Enterprise 
  {
    path: '/enterprisenetworkinfo',
    name: 'Enterprisenetworkinfo',
    component: () => import('@/views/personal/enterprisenetworkinfo'),
    meta: {
      title: '企业网络信息',
      showTab: false
    }
  },
  // 通知公告 notice  
  {
    path: '/notice1',
    name: 'Notice1',
    component: () => import('@/views/personal/notice1'),
    meta: {
      title: '通知公告',
      showTab: false
    }
  },
  // 系统通知
  {
    path: '/notice1',
    name: 'Notice1',
    component: () => import('@/views/personal/notice1'),
    meta: {
      title: '系统通知',
      showTab: false
    }
  },
  // 一网办理
  {
    path: '/networkhandling',
    name: 'Networkhandling',
    component: () => import('@/views/personal/networkhandling'),
    meta: {
      title: '一网办理',
      showTab: false
    }
  },
  // 账号与绑定
  {
    path: '/binding',
    name: 'Binding',
    component: () => import('@/views/personal/binding'),
    meta: {
      title: '账号与绑定',
      showTab: false
    }
  },
  // 改绑手机
  {
    path: '/changephone',
    name: 'Changephone',
    component: () => import('@/views/personal/changephone'),
    meta: {
      title: '改绑手机',
      showTab: false
    }
  },
  // 改绑手机 new
  {
    path: '/changephonenew',
    name: 'Changephonenew',
    component: () => import('@/views/personal/changephonenew'),
    meta: {
      title: '改绑手机',
      showTab: false
    }
  },
  // 修改密码
  {
    path: '/changepassword',
    name: 'Changepassword',
    component: () => import('@/views/personal/changepassword'),
    meta: {
      title: '修改密码',
      showTab: false
    }
  },
  // 意见与反馈
  {
    path: '/tickling',
    name: 'Tickling',
    component: () => import('@/views/personal/tickling'),
    meta: {
      title: '意见与反馈',
      showTab: false
    }
  },
  // 设置
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('@/views/personal/setup'),
    meta: {
      title: '设置',
      showTab: false
    }
  },
  // 直播
  {
    path: '/live',
    name: 'Live',
    component: () => import('@/views/live'),
    meta: {
      title: '直播',
      showTab: false
    }
  },
  // 购物车
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart'),
    meta: {
      title: '购物车',
      showTab: true
    }
  },
  // 我的
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user'),
    meta: {
      title: '我的',
      showTab: true
    }
  },
  // 商品列表
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/product'),
    meta: {
      title: '商品列表',
      keepAlive: true
    }
  },
  // 商品详情
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail'),
    meta: {
      title: '商品详情',
      keepAlive: true
    }
  },
  // 地址管理
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/address/list'),
    meta: {
      title: '地址管理'
    }
  },
  // 地址编辑
  {
    path: '/address/edit',
    name: 'AddressEdit',
    component: () => import('@/views/address/edit'),
    meta: {
      title: '地址编辑'
    }
  },
  // 搜索
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
    }
  },
  // 搜索结果
  {
    path: '/search/list',
    name: 'SearchList',
    component: () => import('@/views/search/list'),
    meta: {
      title: '搜索结果'
    }
  },
  // 确认订单
  {
    path: '/order/confirm',
    name: 'OrderConfirm',
    component: () => import('@/views/order/confirm'),
    meta: {
      title: '确认订单'
    }
  },
  // 订单列表
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('@/views/order/list'),
    meta: {
      title: '订单列表'
    }
  },
  // 订单支付状态-失败、成功
  {
    path: '/order/status',
    name: 'OrderStatus',
    component: () => import('@/views/order/status'),
    meta: {
      title: '支付状态'
    }
  },
  // 订单详情
  {
    path: '/order/detail',
    name: 'OrderDetail',
    component: () => import('@/views/order/detail'),
    meta: {
      title: '订单详情'
    }
  },
  // 售后
  {
    path: '/after-sale',
    name: 'AfterSale',
    component: () => import('@/views/aftersale'),
    meta: {
      title: '订单详情'
    }
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
