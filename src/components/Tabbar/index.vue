<template>
  <div>
    <div class="tabbar">
      <!-- <van-tabbar v-model="active" :active-color="variables.theme" :fixed="false" route>
        <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item to="/category" icon="bars">分类</van-tabbar-item>
        <van-tabbar-item to="/cart" icon="shopping-cart">购物车</van-tabbar-item>
        <van-tabbar-item to="/user" icon="manager">我的</van-tabbar-item>
      </van-tabbar> -->
      <van-tabbar :active="active" bind:change="onChange" v-model="active" :active-color="variables.red"  :fixed="false" route>
        <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item to="/match" icon="bars">赛事</van-tabbar-item>
        <van-tabbar-item  to="/like" icon="like">关注</van-tabbar-item>
        <van-tabbar-item  to="/shop" icon="shop">商场</van-tabbar-item>
        <!-- <van-tabbar-item to="/category" icon="bars">赛事</van-tabbar-item>
        <van-tabbar-item to="/cart" icon="shopping-cart">关注</van-tabbar-item>
        <van-tabbar-item to="/user" icon="manager">商场</van-tabbar-item> -->
        <!-- <van-tabbar-item v-for="item in tabbar" :key="item.url">
          <image
            slot="icon"
            :src="item.normal"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          <image
            slot="icon-active"
            :src="item.active"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          {{item.name}}
        </van-tabbar-item> -->
      </van-tabbar>
    </div>
    <div class="tabbar--placeholder" style="width:100%;height:50px" />
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
// import homeImg from require('@/assets/index/资源 6.png');
// import homeImg1 from require('@/assets/index/home_pre.png');
// import ssImg from require('@/assets/index/game_nor.png');
// import ssImg1 from require('@/assets/index/game_pre.png');
// import likeImg from require('@/assets/index/like_nor.png');
// import likeImg1 from require('@/assets/index/like_nor.png');
// import shopImg from require('@/assets/index/shop_nor.png');
// import shopImg1 from require('@/assets/index/shop_nor(1).png');

export default {
  data() {
    return {
      active: 0,
      tabbar:[{
        normal: require('../../assets/index/资源 6.png'),
        active: require('../../assets/index/home_pre.png'),
        url:'/',
        name:'首页'
      },{
        normal: require('../../assets/index/game_nor.png'),
        active: require('../../assets/index/game_pre.png'),
        url:'/bars',
        name:'赛事'
      },{
        normal: require('../../assets/index/like_nor.png'),
        active: require('../../assets/index/like_nor.png'),
        url:'/cart',
        name:'关注'
      },{
        normal: require('../../assets/index/shop_nor.png'),
        active: require('../../assets/index/shop_nor(1).png'),
        url:'/user',
        name:"商场"
      }]
    }
  },
  watch:{
    $route: {
      handler(route) {
        console.log('route:', route)
        if(route.path=="/football" || route.path=="/basketball" || route.path=="/other" || route.path=="/before") {
          this.active = 1;
        }
        // this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }

  },
  computed: {
    variables() {
      return variables
    },
  },
  methods:{
    onChange(event) {
      this.setData({ active: event.detail });
    },
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 2px solid #f5f5f5;
  z-index: 4;
}
</style>
