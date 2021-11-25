<template>
  <div class="goods-item" @click="onNavigate">
    <div class="pic">
      <div class="lefttop">
        <img src="" alt="">
        <span>篮球</span>
      </div>
      <image-pic
        fill="cover"
        align="center"
        width="100%"
        :src="img"
      />
      <p>直播标题直播标题直播标题直...</p>
    </div>
    <p class="title">{{ desc }}</p>
    <!-- <p class="desc">{{ desc }}</p> -->
    <div class="num">
      <span class="num__now">¥{{ price | toDecimal }}</span>
      <span class="num__old"><img src="../../assets/index/火 (3).png" alt="">   ¥{{ oldPrice | toDecimal }}</span>
    </div>
    <!-- <div class="btn-wrapper">
      <van-button class="btn" size="small">立即购买</van-button>
    </div> -->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['productId', 'img', 'title', 'desc', 'price', 'oldPrice'],
  methods: {
    onNavigate() {
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     productId: this.productId
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.goods-item {
  position: relative;
  width: 174px;
  overflow: hidden;
  .pic {
    height: 200px;
    display: block;
    background: #f5f5f5;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    overflow: hidden;
    ::v-deep .van-image {
      height: 100px;
    }
    position: relative;
    .lefttop {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 74px;
      height: 28px;
      line-height: 28px;
      background: linear-gradient(0deg, #F03E3C, #FF6160);
      box-shadow: 0px 1px 2px 0px #D02626;
      border-radius: 10px 0px 10px 0px;
      img {
        width: 16px;
        height: 17px;
      }
      span {
        font-size: 16px;
        line-height: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    p {
      width: 274px;
      font-size: 20px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #FFFFFF;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 12px;
      margin:0 auto;
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
    color: #A4A4A4;
    padding-bottom: 30px;
    .num__now {
      
    }
    .num__old {
      img {
        width: 18px;
        height: 20px;
        vertical-align: middle;
      }
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
