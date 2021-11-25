<template>
  <div class="nav-compoment">
    <van-popup custom-style="background-color: none !important;" class="popopbox" v-model="show" @click-overlay='closebox' @click='closebox'>
      <!-- <img class="popup" src="../../assets/index/bg.png" alt=""> -->
      <van-image
        class="popup"
        :src="img"
        />
      <img class="close" @click="closebox" src="../../assets/index/关闭 (3).png" alt="">
      <div class="dowload" @click="dowload">
        <img src="../../assets/index/圆角矩形 2.png" alt="">
        <span>马上登录</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:true,
      img:require('../../assets/index/bg.png'),
    }
  },
  methods: {
    dowload() {
      this.$router.push({
          name:"Login"
      })
    },
    closebox() {
      this.$parent.closeBox(false);
    }
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
    width: 491px;
    height: 615px;
  }
  .dowload {
    position: absolute;
    left: 0;
    right: 0;
    top: 565px;
    margin: auto;
    z-index: 3;
    width: 292px;
    height: 84px;
    span {
      font-size: 33px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #FFFFFF;
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      margin:auto;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .close {
    width: 64px;
    height: 63px;
    margin: 55px auto 0;
  }
</style>
