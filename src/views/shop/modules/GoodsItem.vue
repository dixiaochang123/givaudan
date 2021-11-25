<template>
  <div class="goods-item" :style="{ width: width }" @click="onNavigate">
    <div class="pic">
      <image-pic fill="cover" align="center" width="100%" height="100%" :src="img" />
    </div>
    <div class="num">
      <span class="num__old"
        ><img src="../../../assets/shop/图层 4.png" alt="" />
        {{ oldPrice || "0" }}</span
      >
      <span class="num__now">￥{{ price || "0" }}</span>
    </div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: [
    "productId",
    "img",
    "title",
    "desc",
    "price",
    "oldPrice",
    "width",
    "user_nicename",
    "hot",
    "liveType",
  ],
  methods: {
    onNavigate() {
      this.$router.push({
          // name:"Live"
          path: "/shopdetails",
          query: {
            id: this.productId
          },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.goods-item {
  position: relative;
  width: 320px;
//   height: 394px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 22px;;
  .pic {
    height: 260px;
    display: block;
    background: #f5f5f5;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
    // border-radius: 10px;
    overflow: hidden;
    position: relative;
    > div {
      height: 100%;
    }
    ::v-deep .van-image {
      height: 100% !important;
    }
    .lefttop {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 94px;
      height: 38px;
      line-height: 38px;
      background: linear-gradient(0deg, #f03e3c, #ff6160);
      box-shadow: 0px 1px 2px 0px #d02626;
      border-radius: 10px 0px 10px 0px;
      img {
        width: 16px;
        height: 17px;
      }
      span {
        font-size: 14px;
        line-height: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    p {
      width: 274px;
      font-size: 20px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #ffffff;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .title {
    padding: 14px;
    font-size: $small;
    color: $black;
    text-align: left;
    @include text-ellipsis;
    width: 281px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc {
    padding: 14px;
    padding-top: 0;
    font-size: $small;
    color: $gray;
    text-align: center;
    @include text-ellipsis;
  }
  .num {
    padding-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #a4a4a4;
    padding-bottom: 30px;
    .num__now {
      width: 50%;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num__old {
    white-space: nowrap;
      img {
        width: 30px;
        height: 30px;
        vertical-align: inherit;

      }
    font-size: 34px;
    font-family: DIN;
    font-weight: bold;
    color: #ff0000;
    }
  }
  .btn-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 24px;
    .btn {
      background: $red;
      color: #fff;
      border: none;
    }
  }
}
</style>
