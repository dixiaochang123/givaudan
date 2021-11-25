<template>
  <div class="nav-compoment">
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed placeholder z-index="5" @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
        <div class="title">
            <div class="left">
                <img :src="src" alt="">

            </div>
        </div>
      </template>
      <template #title>
        <div class="title">
            <img src="../../assets/index/酷虎logo80x26.png" alt="">
        </div>
      </template>
      <template #right>
        <div class="dow">打开APP</div>
      </template>
    </van-nav-bar>
    <van-popup custom-style="background-color: none !important;" class="popopbox" v-model="show">
      <img class="popup" src="../../assets/index/弹窗.png" alt="">
      <img class="close" @click="show = false" src="../../assets/index/关闭 (3).png" alt="">
      <div class="dowload" @click="dowload"></div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      show:false,
      src:require('../../assets/index/未登陆29x29.png'),
      // src:require('../../assets/index/已登陆默认头像.png')
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    $route: {
      handler(route) {
        console.log('route:', route)
        if(!!this.userInfo.id) {
          console.log(this.userInfo)
          this.src = (!!this.userInfo.avatar && this.userInfo.avatar!="/default.jpg") ? this.userInfo.avatar : require('../../assets/index/已登陆默认头像.png')
        } else {
          this.src = require('../../assets/index/未登陆29x29.png')
        }
        // this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    },
    userInfo: {
      handler(newName) {
        console.log(newName);
      },
      immediate: true,
      deep: true
    }
  } ,
  mounted(){
    if(!!this.userInfo.id) {
      console.log(this.userInfo)
      this.src = (!!this.userInfo.avatar && this.userInfo.avatar!="/default.jpg") ? this.userInfo.avatar : require('../../assets/index/已登陆默认头像.png')
    } else {
      this.src = require('../../assets/index/未登陆29x29.png')
    }

  },
  methods: {
    onClickLeft() {
       if(!this.userInfo.id) {
         this.$router.push({
            name:"Login"
        });
        return
       }
      this.$router.push({
          name:"Personal"
      });
    },
    onClickRight() {
      this.show = true;
    },
    dowload() {
      console.log("下载App");
      this.show = false;
      window.open("http://khht.gasgyw.cn/down/kuhu/index.html#/","_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

// reset vant-nav-bar style
.nav-compoment {
  .van-nav-bar {
    .van-icon {
      color: $black;
    }
    .van-nav-bar__text {
      color: $black;
    }
    .title {
        img {
        width: 80px;
        height: 26px;

        }
    }
    .left {
        width: 29px;
        height: 29px;
        border-radius: 50%;
        overflow:hidden;
        background-color: #9C6C34;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .dow {
      width: 70px;
      height: 25px;
      line-height: 25px;
      background: #ff5959;
      border-radius: 25px;

      font-size: 10px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.popopbox.van-popup {
    text-align: center;
    background-color: transparent !important;
  }
  .popup {
    width: 540px;
    height: 723px;
  }
  .dowload {
    position: absolute;
    left: 0;
    right: 0;
    top: 620px;
    margin: auto;
    z-index: 3;
    width: 330px;
    height: 110px;
  }
  .close {
    width: 64px;
    height: 63px;
    margin: 55px auto 0;
  }
</style>
