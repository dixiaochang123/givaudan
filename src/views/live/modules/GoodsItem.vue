<template>
  <div class="goods-item" @click="onNavigate">
    <div class="pic">
      <image-pic fill="cover" align="center" width="100%" :src="img" />
      <div class="num">
        <span class="num__now">{{ title }}</span>
        <span class="num__old"><img src="../../../assets/index/火 (3).png" alt=""> {{ hot | '0' }}</span>
      </div>
    </div>
    <!-- <p class="title">{{ title }}</p> -->
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
      if (this.$route.name == "Shop") {
        this.$router.push({
          // name:"Live"
          path: "/shopdetails",
          query: {
            // productId: this.productId
          },
        });
      } else {
        this.$router.push({
          // name:"Live"
          path: "/live",
          query: {
            uid: this.productId,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.goods-item {
  position: relative;
  // width: 50%;
  overflow: hidden;
  .pic {
    height: 169px;
    display: block;
    background: #f5f5f5;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    overflow: hidden;
    ::v-deep .van-image {
      height: 100px;
    }
    position: relative;
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
    // padding-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 15px;
    font-size: 17px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #ffffff;
    width: 100%;
    position: absolute;
    bottom: 0;

    .num__now {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num__old {
      img {
        width: 18px;
        height: 20px;
        vertical-align: inherit;
      }
      white-space: nowrap;
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
