<template>
  <div class="goods-item"  :style="{width: width}" @click="onNavigate">
    <div class="pic">
      <div class="lefttop">
        <img src="" alt="">
        <span v-if="liveType==1"><img src="../../assets/index/足球 (3).png" alt=""> 足球</span>
        <span v-if="liveType==2"><img src="../../assets/index/篮球 (1).png" alt=""> 篮球</span>
        <span v-if="liveType==3"><img src="../../assets/index/足球 (3).png" alt=""> 电竞</span>
      </div>
      <image-pic
        fill="cover"
        align="center"
        width="100%"
        :src="img"
      />
      <p>{{title}}</p>
    </div>
    <p class="title">{{ title }}</p>
    <div class="num">
      <span class="num__now">{{ user_nicename }}</span>
      <span class="num__old"><img src="../../assets/index/火 (3).png" alt="">   {{ hot | '0' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['productId', 'img', 'title', 'desc', 'price', 'oldPrice','width','user_nicename','hot','liveType'],
  methods: {
    onNavigate() {
      if(this.$route.name=="Shop") {
        this.$router.push({
        // name:"Live"
          path: '/shopdetails',
          query: {
            // productId: this.productId
          }
      })
      } else {

        this.$router.push({
          // name:"Live"
          path: '/live',
          query: {
            uid: this.productId
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.goods-item {
  position: relative;
  width: 320px;
  overflow: hidden;
  background: #fff;
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
      width: 94px;
      height: 38px;
      line-height: 38px;
      background: linear-gradient(0deg, #F03E3C, #FF6160);
      box-shadow: 0px 1px 2px 0px #D02626;
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
      bottom: 20px;
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
    padding-left: 14px;
    padding-right: 14px;
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
