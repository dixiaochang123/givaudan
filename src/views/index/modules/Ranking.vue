<template>
  <div class="home-goods">
    <div class="box">
      <div class="title">
        <div class="triangle-topleft"></div>
        <img src="../../../assets/index/奖杯 (1).png" alt="" />
        <p>主播排行</p>
      </div>
      <h3 @click="show = true">全部排行
        <van-icon style="vertical-align: bottom;" name="arrow" />
      </h3>

    </div>
    <div style="height: 20px"></div>
    <div class="rankings">
      <div class="li" v-for="(item,index) in goodsList" :key="item.uid">
        <div class="imgs">
          <img class="head" :src="item.avatar" alt="">
          <img class="numb" :src="level[index]" alt="">
        </div>
        <h3>{{item.user_nicename}}</h3>
        <p>{{item.signature}}</p>
      </div>

    </div>
    <van-popup custom-style="background-color: none !important;" class="popopbox" v-model="show">
      <img class="popup" src="../../../assets/index/弹窗.png" alt="">
      <img class="close" @click="show = false" src="../../../assets/index/关闭 (3).png" alt="">
      <div class="dowload" @click="dowload"></div>
    </van-popup>
  </div>
</template>

<script>
import Title from "./Title";
import RankingItem from "@/components/RankingItem";

export default {
  components: {
    RankingItem,
    Title,
  },
  model: {
    prop: "isLoading",
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      productId: "",
      img: "",
      title: "",
      desc: "",
      price: "",
      oldPrice: "",
      level:[
        require("../../../assets/index/1.png"),
        require("../../../assets/index/2.png"),
        require("../../../assets/index/3.png"),
        require("../../../assets/index/4.png"),
      ]
    };
  },
  computed: {
    loading: {
      get() {
        return this.isLoading;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    onReachBottom() {
      this.$emit("onReachBottom");
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
.home-goods {
  margin-top: 24px;
  border-radius: 10px;
  background-color: #fff;
  ::v-deep .van-popup {
    background-color: transparent !important;
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
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h3 {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f1413f;
    }
  }
  .title {
    width: 165px;
    height: 50px;
    background: #f03e3c;
    border-radius: 10px 0px 0px 0px;
    position: relative;
    .triangle-topleft {
      position: absolute;
      right: -48px;
      top: 0;
      width: 0px;
      height: 0px;
      border-top: 51px solid #f03e3c;
      border-right: 50px solid transparent;
    }
    img {
      width: 28px;
      height: 27px;
      padding-top: 10px;
      padding-left: 18px;
    }
    p {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 10px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    h3 {
      position: absolute;
      right: 0;
    }
  }
  .rankings {
    width: 100%;
    display: flex;
    .li {
      width: 25%;
      // background-color: red;
      text-align: center;
      .imgs {
        height: 110px;
        position: relative;
        .head {
          width: 84px;
          height: 83px;
          border-radius: 50%;
        }
        .numb {
          width: 41px;
          height: 41px;
          position: absolute;
          left: 50%;
          bottom:0 ;
          margin-left: -18px;
        }
        &::after {
          content: "";
          position: absolute;
          right: 0;
          width: 2px;
          height: 40px;
          background: #E3E3E3;
          top: 50%;
          margin-top: -20px;
        }
      }
      h3 {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        padding-top: 17px;
        padding-bottom: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        padding-bottom: 20px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #a4a4a4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
